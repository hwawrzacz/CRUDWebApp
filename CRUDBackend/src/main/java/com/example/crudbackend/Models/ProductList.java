package com.example.crudbackend.Models;

import org.springframework.web.bind.annotation.RestController;

import javax.persistence.*;

@RestController
@Table(name = "productLists")
public class ProductList {

    //region Fields
    @Id
    @Column(name = "productID")
    private int productID;

    @Id
    @Column(name = "recipeID")
    private int recipeID;
    //endregion


    //region Getters and setters
    public int getProductID() {
        return productID;
    }
    public void setProductID(int productID) {
        this.productID = productID;
    }

    public int getRecipeID() {
        return recipeID;
    }
    public void setRecipeID(int recipeID) {
        this.recipeID = recipeID;
    }
    //endregion


    //region Constructors
    public ProductList(){}

    public ProductList(int productID, int recipeID){
        this.productID = productID;
        this.recipeID = recipeID;
    }
}
