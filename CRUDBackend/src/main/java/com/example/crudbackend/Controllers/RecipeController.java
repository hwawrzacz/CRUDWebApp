package com.example.crudbackend.Controllers;

import com.example.crudbackend.Models.Recipe;
import com.example.crudbackend.Models.Ingredient;
import com.example.crudbackend.Repositories.IRecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Iterator;

@CrossOrigin
@RestController
@RequestMapping("/recipes")
public class RecipeController {

    @Autowired
    private IRecipeRepository recipeRepository;

    @Autowired
    private EntityManager entityManager;



    //region Recipes
    @GetMapping("/getjsonobject")
    public Recipe getRecipeString(){
        return getRecipeById(1);
    }

    @GetMapping("/getallrecipesbyname")
    public Iterable<Recipe> getRecipeContainingName(@RequestParam("name") String name){
        return recipeRepository.findAllByNameContaining(name);
    }

    @PostMapping("/create")
    public String addRecipe(@RequestBody Recipe recipe){
        if (!recipeExist(recipe)){
            addRecipe(recipe);
            return "Recipe updated";
        }
        else
            return "Recipe update failed";
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


    private boolean doesRecipeContainsIngredients(Recipe recipe, ArrayList<String> ingredientsNames) {
        int matchingIngredients = 0;

        for (Ingredient recipeIngredient: recipe.getIngredients()) {
            for (String givenIngredientName: ingredientsNames){
                if (recipeIngredient.getProductname().equals(givenIngredientName)){
                    matchingIngredients++;
                }
                System.out.println(" " + matchingIngredients);
            }
        }
        if (matchingIngredients == ingredientsNames.size()){
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
        return recipeRepository.findById(id);
    }

    private boolean recipeExist(Recipe recipe) {
        return (getRecipeById(recipe.getRecipeid()) != null);
    }
    //endregion
}
