package com.example.crudbackend.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@IdClass(ProductList.class)
@Table(name = "productlists")
public class ProductList implements Serializable {

    //region Fields
    //get mapped field as foreign key from 'products' table
    @Id
    @ManyToOne(fetch = FetchType.EAGER)
    @JsonBackReference
    @JoinColumn(name = "productname")
    private Product product;

    //get mapped field as foreign key from 'recipes' table
    @Id
    @ManyToOne(fetch = FetchType.EAGER)
    @JsonBackReference
    @JoinColumn(name = "recipeid")
    private Recipe recipe;

    @Column(name = "amount")
    private double amount;

    @Column(name = "unit")
    private String unit;
    //endregion


    //region Getters and setters
    //product
//    public Product getProduct() {
//        return product;
//    }
    public void setProduct(Product product) {
        this.product = product;
    }

    //productname
    public String getProductname() {
        return product.getName();
    }

    //recipe
//    public Recipe getRecipe() {
//        return recipe;
//    }

    //recipeid
    public int getRecipeid() {
        return recipe.getRecipeid();
    }
    //amount
    public double getAmount() {
        return amount;
    }

    //unit
    public String getUnit() {
        return unit;
    }
    //endregion


    //region Constructors
    public ProductList(){}

    public ProductList(Product product, Recipe recipe, double amount, String unit){
        this.product = product;
        this.recipe = recipe;
        this.amount = amount;
        this.unit = unit;
    }
    //endregion


    @Override
    public String toString(){
        return product.getName() +" "+ amount +" "+ unit;
    }
}
