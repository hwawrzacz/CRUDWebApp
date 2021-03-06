package com.example.crudbackend.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity(name = "Ingredient")
@Table(name = "ingredients")
//@IdClass(IngredientId.class)
public class Ingredient implements Serializable {

    // region Test version
    // region Fields
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;

    @ManyToOne
    @JsonBackReference(value = "recipe_id_ref")
    @JoinColumn(name = "recipeid")
    private Recipe recipe;

    @ManyToOne
    @JoinColumn(name = "productname")
    private Product product;

    private double amount;
    private String unit;
    // endregion

    //region Getters and setters
    //amount
    public long getId() { return this.id; }
    public void setId(long id) { this.id = id; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    //unit
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    //recipeid
    public Recipe getRecipe() { return recipe; }
    public void setRecipe(Recipe recipe) { this.recipe = recipe; }

    //public void setRecipeid(int id) { this.recipe.setRecipeid(id); }

    //product
    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    // productname
//    public void setProductname(String productname) { this.product.setProductname(productname); }
//    public String getProductname() { return product.getProductname(); }
    //endregion
    // endregion


    // region Constructors
    public Ingredient() {
    }

    public Ingredient(Recipe recipe, Product product, double amount, String unit) {
        this.recipe = recipe;
        this.product = product;
        this.amount = amount;
        this.unit = unit;
    }

//    public Ingredient(IngredientId id, double amount, String unit) {
//        this.id = id;
//        this.amount = amount;
//        this.unit = unit;
//    }
//endregion

    @Override
    public String toString() {
        return /*getId()*/ getRecipe().getRecipeid() + " " + getProduct().getProductname() + " " + amount + " " + unit;
    }
}
