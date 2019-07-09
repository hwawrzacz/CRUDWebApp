package com.example.crudbackend.Controllers;

import com.example.crudbackend.Models.Product;
import com.example.crudbackend.Repositories.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/recipes")
public class RecipeController {

    @Autowired
    IProductRepository productRepository;

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
    //endregion
}
