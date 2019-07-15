package com.example.crudbackend.Controllers;

import com.example.crudbackend.Models.Product;
import com.example.crudbackend.Models.Recipe;
import com.example.crudbackend.Models.ProductList;
import com.example.crudbackend.Repositories.IProductRepository;
import com.example.crudbackend.Repositories.IRecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
        return getProductByName(name);
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
        return productRepository.findByNameContaining(name);
    }

    //http://localhost:8080/recipes/updateproduct?name=szynka&protein=15&carbs=50&fat=9&kcal=355
    @PutMapping("/updateproduct")
    public String updateProduct(@RequestParam("name") String name, @RequestParam("protein") double protein,
                                @RequestParam("carbs") double carbs, @RequestParam("fat") double fat, @RequestParam("kcal") int kcal){
        if (updateSaveProduct(new Product(name, protein, carbs, fat, kcal)))
            return "Product updated successfully";
        else
            return "Product update failed";
    }

    @DeleteMapping("/deleteproduct")
    public String deleteUser(@RequestParam("name") String name){
        //productRepository.deleteById();
        return "Product deletion called";
    }

    @PutMapping("/addnewproduct")
    public String addNewProduct(@RequestParam("name") String name, @RequestParam("protein") double protein,
                                @RequestParam("carbs") double carbs, @RequestParam("fat") double fat, @RequestParam("kcal") int kcal){
        if (!productExists(name)){
            if (updateSaveProduct(new Product(name, protein, carbs, fat, kcal)))
                return "Product added successfully";
            else
                return "Product add failed";
        }
        else
            return "Product already exists";
    }

    private boolean updateSaveProduct(Product product){
        try{
            productRepository.save(product);
            return true;
        }
        catch (Exception exc){ return false; }
    }

    private boolean productExists(String name){
        if (productRepository.findByName(name) == null) return false;
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

        for (ProductList productList : recipe.getProducts()) {
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
