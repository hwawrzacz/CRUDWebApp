package com.example.crudbackend.Controllers;

import com.example.crudbackend.Models.Product;
import com.example.crudbackend.Repositories.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;


@CrossOrigin
@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private IProductRepository productRepository;

    @Autowired
    private EntityManager entityManager;


    //region Products
    @GetMapping("/getallbyname")
    public Iterable<Product> getProductsContainingName(@RequestParam("name") String name) {
        return productRepository.findByProductnameContainingIgnoreCaseOrderByProductnameAsc(name);
    }

    @PostMapping("/create")
    public String createProduct(@RequestBody Product product){
        System.out.println("add new product");
        if (!productExists(product.getProductname())){
            return addProduct(product);
        }
        else
            return "Product already exists";
    }

    @PutMapping("/update")
    @Transactional
    public String updateProduct(@RequestParam("name") String name, @RequestBody Product product){
        return executeUpdateProductQuery(name, product);
    }

    @DeleteMapping("/delete")
    @Transactional
    public String deleteUser(@RequestParam("name") String name){
        return this.executeDeleteProductQuery(name);
    }

    private String addProduct(Product product){
        try{
            productRepository.save(product);
            return "Product added successfully";
        }
        catch (Exception exc){
            return "Product addition failed. Error message: "+ exc.getMessage();
        }
    }

    private String executeUpdateProductQuery(String name, Product updatedProduct){
        try{
            entityManager.createQuery("UPDATE Product product " +
                    "SET product.productname=?1, product.protein=?2, product.carbs=?3," +
                    " product.fat=?4, product.kcal=?5 WHERE product.productname=?6")
                    .setParameter(1, updatedProduct.getProductname())
                    .setParameter(2, updatedProduct.getProtein())
                    .setParameter(3, updatedProduct.getCarbs())
                    .setParameter(4, updatedProduct.getFat())
                    .setParameter(5, updatedProduct.getKcal())
                    .setParameter(6, name)
                    .executeUpdate();
            return "Product updated";
        } catch (Exception exc){
            return "Product couldn't be updated. Error message: "+ exc.getMessage();
        }
    }

    private String executeDeleteProductQuery(String name){
        try{
            productRepository.deleteByProductname(name);
            return "Product deleted";
        } catch (Exception exc){
            return "Product couldn't be deleted. Error message: "+ exc.getMessage();
        }
    }

    private boolean productExists(String name){
        if (productRepository.findByProductname(name) == null) { return false; }
        return true;
    }
    //endregion

}
