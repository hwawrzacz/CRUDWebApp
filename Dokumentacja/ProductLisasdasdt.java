package com.example.crudbackend.Models;

import org.springframework.web.bind.annotation.RestController;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@IdClass(ProductList.class)
@Table(name = "productList")
public class ProductList implements Serializable {

    //region Fields
    @Id
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "productname")
    private Product product;
    //private String productName;

    @Id
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "recipeid")
    private Recipe recipe;

    @Column(name = "amount")
    private double amount;

    @Column(name = "unit")
    private String unit;
    //endregion


    //region Getters and setters
    //productName
    public Product getProduct() {
        return product;
    }
    public void setProduct(Product product) {
        this.product = product;
    }

    //recipe
    public Recipe getRecipe() {
        return recipe;
    }
    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }

    //amount
    public double getAmount() {
        return amount;
    }
    public void setAmount(double amount) {
        this.amount = amount;
    }

    //unit
    public String getUnit() {
        return unit;
    }
    public void setUnit(String unit) {
        this.unit = unit;
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
}
