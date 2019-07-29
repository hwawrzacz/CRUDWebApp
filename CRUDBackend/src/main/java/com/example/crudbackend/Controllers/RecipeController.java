package com.example.crudbackend.Controllers;

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
    public String updateRecipe(@RequestBody Recipe recipe){
        return addRecipe(recipe);
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

    private String addRecipe(Recipe recipe) {
        try{
            System.out.println("saving recipe id: " + recipe.getRecipeid());
            this.recipeRepository.save(recipe);
            System.out.println(recipe);
            this.addIngredientsToRecipe(recipe);
            return "Saved";
        }
        catch (Exception exc){
            return "Not saved. Exception: " + exc.getMessage();
        }
    }

    private void addIngredientsToRecipe (Recipe recipe) {
        System.out.println("Adding recipe ingredients");
        for (Ingredient ingredient: recipe.getIngredients()) {

            String query = "INSERT INTO Ingredient ('recipeid', 'productname','amount', 'value') " +
                    "VALUES (?1, ?2, ?3, ?4)";

            entityManager.createNativeQuery(query)
                    .setParameter(1, recipe.getRecipeid())
                    .setParameter(2, ingredient.getProduct().getProductname())
                    .setParameter(3, ingredient.getAmount())
                    .setParameter(4, ingredient.getUnit())
                    .executeUpdate();
        }
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

    private Recipe getRecipeById(int id){
        return recipeRepository.findByRecipeid(id);
    }

    private boolean recipeExist(Recipe recipe) {
        return (getRecipeById(recipe.getRecipeid()) != null);
    }
}
