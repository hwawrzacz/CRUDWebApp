package com.example.crudbackend.Controllers;

import com.example.crudbackend.Models.Recipe;
import com.example.crudbackend.Models.Ingredient;
import com.example.crudbackend.Repositories.IRecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;

@CrossOrigin
@RestController
@RequestMapping("/recipes")
public class RecipeController {

    @Autowired
    private IRecipeRepository recipeRepository;

    @Autowired
    private EntityManager entityManager;

    //region Recipes
    @GetMapping("/getallrecipesbyname")
    public Iterable<Recipe> getRecipeContainingName(@RequestParam("name") String name){
        return recipeRepository.findAllByNameContaining(name);
    }

    @PutMapping("/addrecipe")
    public String addRecipe(@RequestParam("name") String name, @RequestParam("description") String description, @RequestParam("type") String type){
        if (saveRecipe(new Recipe(name, description, type)))
            return "Recipe updated";
        else
            return "Recipe update failed";
    }

//    private getRecipeByIngredients(Iterable<Ingredient>){
//        try{
//            String query = "SELECT recipe.recipeid FROM Recipe recipe, Ingredients ingredient WHERE recipe.ingredients";
//            entityManager.createQuery(""){
//
//            }
//        }
//    }

    private boolean saveRecipe(Recipe recipe){
        try{
            recipeRepository.save(recipe);
            return true;
        }
        catch (Exception exc){
            return false;
        }
    }

    private Recipe doesRecipeExist(int id) {
        return recipeRepository.findById(id);
    }
    //endregion
}
