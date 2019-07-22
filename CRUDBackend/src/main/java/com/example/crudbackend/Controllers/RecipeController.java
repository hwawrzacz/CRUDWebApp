package com.example.crudbackend.Controllers;

import com.example.crudbackend.Models.Product;
import com.example.crudbackend.Models.Recipe;
import com.example.crudbackend.Models.ProductList;
import com.example.crudbackend.Repositories.IProductRepository;
import com.example.crudbackend.Repositories.IRecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.util.ArrayList;

@CrossOrigin
@RestController
@RequestMapping("/recipes")
public class RecipeController {

    @Autowired
    private IProductRepository productRepository;

    @Autowired
    private IRecipeRepository recipeRepository;


    //region Products
    @GetMapping("/showproductbyname")
    public String findProductByName(@RequestParam("name") String name){
        String result = "<html><table><tr><td>Nazwa</td> <td>Białko (g)</td> <td>Węglowodany (g)</td> <td>Tłuszcz (g)</td> <td>kcal</td></tr>";
        getProductByName(name).toHtmlTableRow();

        return result+"</table></html>";
    }

    @GetMapping("/getproductbyname")
    public Product getProductByName(@RequestParam("name") String name){
        return productRepository.findByProductname(name);
    }

    @GetMapping("/showallproductsbyname")
    public String showProductsContainingName(@RequestParam("name") String name){
        String result = "<html><body><table border='1'><tr><td><b>Nazwa</b></td> <td><b>Białko (g)</b></td> <td><b>Węglowodany (g)</b></td> <td><b>Tłuszcz (g)</b></td> <td><b>kcal</b></td></tr>";

        for (Product product : getProductsContainingName(name)) {
            result += product.toHtmlTableRow();
        }
        return result+"</body></table></html>";
    }

    @GetMapping("/getallproductsbyname")
    public Iterable<Product> getProductsContainingName(@RequestParam("name") String name) {
        return productRepository.findByProductnameContaining(name);
    }

    @GetMapping("/getallproductsname")
    public ArrayList<String> getAllProductsName(@RequestParam("name") String name){
        ArrayList<String> productNames = new ArrayList<String>();

        for (Product product: getProductsContainingName("")) {
            productNames.add(product.getProductname());
        }

        return productNames;
    }

    //http://localhost:8080/recipes/updateproduct?name=szynka&protein=15&carbs=50&fat=9&kcal=355
    @PutMapping("/updateproduct")
    public String updateProduct(@RequestBody Product product){
        if (saveProduct(product)) {
            return "Product updated successfully";
        } else {
            return "Product update failed";
        }
    }

    @DeleteMapping("/deleteproduct")
    public String deleteUser(@RequestParam("name") String name){
        //productRepository.deleteById();
        return "Product deletion called";
    }

    @PostMapping("/addnewproduct")
    public String addNewProduct(@RequestBody Product product){
        System.out.println("add new product");
        if (!productExists(product.getProductname())){
            if (saveProduct(product)) {
                return "Product added successfully";
            }
            else {
                return "Product addition failed";
            }
        }
        else
            return "Product already exists";
    }

    private boolean saveProduct(Product product){
        try{
            productRepository.save(product);
            return true;
        }
        catch (Exception exc){ return false; }
    }

    private boolean productExists(String name){
        if (productRepository.findByProductname(name) == null) { return false; }
        return true;
    }
    //endregion


    //region Recipes
    @GetMapping("/showallrecipesbyname")
    public String showRecipeContainingName(@RequestParam("name") String name){
        String result = "";

        for(Recipe recipe : getRecipeContainingName(name)){
            result += recipe.toString() +"</br>";
        }
        return result;
    }

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

    private boolean saveRecipe(Recipe recipe){
        try{
            recipeRepository.save(recipe);
            return true;
        }
        catch (Exception exc){
            return false;
        }
    }

    @GetMapping("/showrecipedetails")
    public String showRecipeDetails(@RequestParam("id") int id) {
        Recipe recipe = getRecipeById(id);
        String result = "<b>" + recipe.getName() + "</b><br></br>";

        for (ProductList productList : recipe.getIngredients()) {
            result += productList.toString() + "</br>";
        }

        return result;
    }

        @GetMapping("/getrecipebyid")
    public Recipe getRecipeById(@RequestParam("id") int id) {
        return recipeRepository.findById(id);
    }
    //endregion
}
