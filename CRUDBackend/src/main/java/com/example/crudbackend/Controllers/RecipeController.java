package com.example.crudbackend.Controllers;

import com.example.crudbackend.Models.IngredientId;
import com.example.crudbackend.Models.Recipe;
import com.example.crudbackend.Models.Ingredient;
import com.example.crudbackend.Repositories.IRecipeRepository;
import com.example.crudbackend.Repositories.IProductRepository;
import com.example.crudbackend.Repositories.IngredientRepository;
import org.hibernate.tool.schema.internal.exec.ScriptTargetOutputToFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import java.util.ArrayList;

@CrossOrigin
@RestController
@RequestMapping("/recipes")
public class RecipeController {

    @Autowired
    private IRecipeRepository recipeRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    @Autowired
    private EntityManager entityManager;



    @GetMapping("/getallrecipesbyname")
    public Iterable<Recipe> getRecipeContainingName(@RequestParam("name") String name){
        return recipeRepository.findAllByNameContaining(name);
    }

    @PostMapping("/getbyingredients")
    public ArrayList<Recipe> getRecipeByIngredients(@RequestBody ArrayList<String> ingredientsNames){
        ArrayList<Recipe> matchingRecipes = new ArrayList<>();
        try{
            String queryGetAllRecipes = "SELECT rcp FROM Recipe rcp JOIN rcp.ingredients GROUP BY rcp";
            Iterable<Recipe> recipes = entityManager.createQuery(queryGetAllRecipes).getResultList();

            for (Recipe recipe: recipes){
                if (this.doesRecipeContainsIngredients(recipe, ingredientsNames)){
                    matchingRecipes.add(recipe);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return matchingRecipes;
    }

    @PostMapping("/create")
    public String addNewRecipe(@RequestBody Recipe recipe){
        if (recipeExist(recipe)){
            return "Recipe already exists";
        }
        else{
            return addRecipe(recipe);
        }
    }

    @PutMapping("/update")
    @Transactional
    public String updateRecipe(@RequestBody Recipe recipe){
        return executeUpdateRecipeQuery(recipe);
    }

    @DeleteMapping("/delete")
    public String deleteRecipe(@RequestParam("id") long id){
        try {
            recipeRepository.deleteById(id);
            return "Deleted";
        }
        catch (Exception exc){
            return "Not deleted. Exception: " + exc.getMessage();
        }
    }

    private String addRecipe(Recipe recipe) {
        try{
            System.out.println("saving recipe id: " + recipe.getRecipeid());
            System.out.println("before save");
            this.recipeRepository.save(recipe);
            System.out.println("after save");
            System.out.println("before ingredients save");
            this.ingredientRepository.saveAll(recipe.getIngredients());
            //this.addIngredientsToRecipe(recipe);
            System.out.println("after ingredients save");
            return "Saved";
        }
        catch (Exception exc){
            return "Not saved. Exception: " + exc.getMessage();
        }
    }

    private void addIngredientsToRecipe (Recipe recipe) {
        System.out.println("Adding recipe ingredients: " + recipe.getIngredients().size());
        ingredientRepository.saveAll(recipe.getIngredients());

//        for (Ingredient ingredient: recipe.getIngredients()) {
//            Ingredient newIngredient = new Ingredient(ingredient.getRecipe(), ingredient.getProduct(),
//                    ingredient.getAmount(),ingredient.getUnit());
//            System.out.println("Ingredient: " + " " + ingredient.getRecipe().getRecipeid() + " " +
//                    newIngredient.getProduct().getProductname() + " " +
//                    newIngredient.getAmount() + " " + newIngredient.getUnit() );
//            ingredientRepository.save(newIngredient);

//            System.out.println(ingredient.toString());
//            String query = "INSERT INTO Ingredient ('recipeid', 'productname','amount', 'unit') VALUES (?1, ?2, ?3, ?4)";
//
//            entityManager.createNativeQuery(query)
//                    .setParameter(1, recipe.getRecipeid())
//                    .setParameter(2, ingredient.getProduct().getProductname())
//                    .setParameter(3, ingredient.getAmount())
//                    .setParameter(4, ingredient.getUnit())
//                    .executeUpdate();
//        }
    }

    private String executeUpdateRecipeQuery(Recipe updatedRecipe) {
        //try{
            entityManager.createQuery("UPDATE Recipe recipe " +
                    "SET recipe.name=?1, recipe.type=?2, recipe.description=?3," +
                    " recipe.additiondate=?4 WHERE recipe.recipeid=?5")
                    .setParameter(1, updatedRecipe.getName())
                    .setParameter(2, updatedRecipe.getType())
                    .setParameter(3, updatedRecipe.getDescription())
                    .setParameter(4, updatedRecipe.getAdditiondate())
                    .setParameter(5, updatedRecipe.getRecipeid())
                    .executeUpdate();
            addIngredientsToRecipe(updatedRecipe);
            return "Recipe updated";
//        } catch (Exception exc){
//            return "Recipe couldn't be updated. Error message: "+ exc.getMessage();
//        }
    }

    private boolean doesRecipeContainsIngredients(Recipe recipe, ArrayList<String> ingredientsNames) {
        int matchingIngredients = 0;

        for (Ingredient recipeIngredient: recipe.getIngredients()) {
            for (String givenIngredientName: ingredientsNames) {
                if (recipeIngredient.getProduct().getProductname().equals(givenIngredientName)) {
                    matchingIngredients++;
                }
            }
        }
        if (matchingIngredients == ingredientsNames.size()) {
            return true;
        }
        return false;
    }


    private boolean saveRecipe(Recipe recipe){
        try{
            recipeRepository.save(recipe);
            return true;
        }
        catch (Exception exc){
            return false;
        }
    }

    private Recipe getRecipeById(long id){
        return recipeRepository.findByRecipeid(id);
    }

    private boolean recipeExist(Recipe recipe) {
        return (getRecipeById(recipe.getRecipeid()) != null);
    }
}
