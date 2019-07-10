package com.example.crudbackend.Controllers;

import com.example.crudbackend.Models.Product;
import com.example.crudbackend.Models.Recipe;
import com.example.crudbackend.Models.ProductList;
import com.example.crudbackend.Repositories.IProductListRepository;
import com.example.crudbackend.Repositories.IProductRepository;
import com.example.crudbackend.Repositories.IRecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/recipes")
public class RecipeController {

    @Autowired
    private IProductRepository productRepository;

    @Autowired
    private IRecipeRepository recipeRepository;

    @Autowired
    private IProductListRepository productListRepository;


    //region Products
    @RequestMapping("/showallproducts")
    public String showAllProducts() {
        String result = "<html><table><tr><td>Nazwa</td> <td>Białko (g)</td> <td>Węglowodany (g)</td> <td>Tłuszcz (g)</td> <td>kcal</td></tr>";

        for (Product product : productRepository.findAll()) {
            result += product.toHtmlTableRow() + "";
        }
        return result+"</table></html>";
    }

    @RequestMapping("/findproduct")
    public String findProduct(@RequestParam("search") String search){
        String result = "<html><table><tr><td>Nazwa</td> <td>Białko (g)</td> <td>Węglowodany (g)</td> <td>Tłuszcz (g)</td> <td>kcal</td></tr>";

        for (Product product : productRepository.findByNameContaining(search)) {
            result += product.toHtmlTableRow() + "\n";
        }
        return result+"</table></html>";
    }

    @RequestMapping("/showproductbyname")
    public String findProductByName(@RequestParam("name") String name){
        String result = "<html><table><tr><td>Nazwa</td> <td>Białko (g)</td> <td>Węglowodany (g)</td> <td>Tłuszcz (g)</td> <td>kcal</td></tr>";

        Product product = productRepository.findByName(name);
        result += product.toHtmlTableRow();
        return result+"</table></html>";
    }

    //http://localhost:8080/recipes/updateproduct?name=szynka&protein=15&carbs=50&fat=9&kcal=355
    @RequestMapping("/updateproduct")
    public String updateProduct(@RequestParam("name") String name, @RequestParam("protein") double protein,
                                @RequestParam("carbs") double carbs, @RequestParam("fat") double fat, @RequestParam("kcal") int kcal){
        try{
            productRepository.save(new Product(name, protein, carbs, fat, kcal));
            return "Product updated successfully";
        }
        catch (Exception exc){
            return "Product update failed";
        }
    }
    //endregion


    //region Recipes
    @RequestMapping("/showallrecipes")
    public String showAllRecipes(){
        String result = "";

        for(Recipe recipe : recipeRepository.findAll()){
            result += recipe.toString() +"</br>";
        }

        return result;
    }

    @RequestMapping("/addnewrecipe")
    public String addNewRecipe(@RequestParam("name") String name, @RequestParam("description") String description, @RequestParam("type") String type){
        try{
            recipeRepository.save(new Recipe(name, description, type));
            return "Recipe updated";
        }
        catch (Exception exc){
            return "Recipe update failed";
        }
    }
    //endregion


    //region ProductLists
    @RequestMapping("/showrecipedetails")
    public String showRecipeDetails(@RequestParam("id") int id) {
        Recipe recipe = recipeRepository.findById(id);
        String result = "<b>" + recipe.getName() + "</b><br></br>";
        System.out.println("\n\n\n\nCount: " + productListRepository.count());
        for (ProductList productList : productListRepository.findAllByRecipe(recipe)) {
            result += productList.toString() + "</br>";
        }
            return result;
    }

//    @RequestMapping("/addingredientstorecipe")
//    public String showRecipeDetails(@RequestParam("recipeid") int recipeid, @RequestParam("ingredients")  ingredients){
//
//        for(String ingredient : ingredients){
//            productRepository.Save(new ProductList(int)) +"</br>";
//        }
//        return result;
//    }
    //endregion
}
