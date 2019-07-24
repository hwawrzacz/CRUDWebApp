package com.example.crudbackend.Models;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@IdClass(Ingredient.class)
@Table(name = "productlists")
public class Ingredient implements Serializable {

    //region Fields
    //get mapped field as foreign key from 'products' table
    @Id
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "productname")
    private Product product;

    //get mapped field as foreign key from 'recipes' table
    @Id
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "recipeid")
    private Recipe recipe;

    @Column(name = "amount")
    private double amount;

    @Column(name = "unit")
    private String unit;
    //endregion


    //region Getters and setters
    //productname
    public String getProductname() { return product.getProductname(); }

    //recipeid
    public int getRecipeid() { return recipe.getRecipeid(); }

    //amount
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    //unit
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
    //endregion


    //region Constructors
    public Ingredient(){}

    public Ingredient(Product product, Recipe recipe, double amount, String unit){
        this.product = product;
        this.recipe = recipe;
        this.amount = amount;
        this.unit = unit;
    }
    //endregion


    @Override
    public String toString(){
        return product.getProductname() +" "+ amount +" "+ unit;
    }
}
