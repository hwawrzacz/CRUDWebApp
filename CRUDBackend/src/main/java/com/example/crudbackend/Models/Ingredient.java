package com.example.crudbackend.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "products_in_recipes")
@IdClass(Ingredient.class)
public class Ingredient implements Serializable {

    // region Test version
    // region Fields
    @Id
    @ManyToOne
    @JsonBackReference(value = "recipe_id_ref")
    @JoinColumn(name = "recipeid")
    private Recipe recipe;

    @Id
    @ManyToOne
    @JoinColumn(name = "productname")
    private Product product;

    private double amount;
    private String unit;
    // endregion

    //region Getters and setters
    //amount
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    //unit
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    //recipeid
//    public Recipe getRecipe() { return recipe; }
    public void setRecipe(Recipe recipe) { this.recipe = recipe; }
    public void setRecipeid(int id) { this.recipe.setRecipeid(id); }

    //product
    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    //productname
//    public void setProductname(String productname) { this.product.setProductname(productname); }
//    public String getProductname() { return product.getProductname(); }
    //endregion
    // endregion


    // region Constructors
    public Ingredient() {
    }
    //endregion

    @Override
    public String toString() {
        return product.getProductname() + " " + amount + " " + unit;
    }


}
