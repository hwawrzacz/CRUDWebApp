package com.example.crudbackend.Models;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "products")
public class Product {

    //region Fields
    @Id
    @Column(name = "name")
    private String name;

    //map foreign key in 'productlist' table
    @OneToMany(mappedBy = "product",fetch = FetchType.EAGER)
    private List<ProductList> recipes;

    @Column(name = "protein")
    private double protein;

    @Column(name = "carbs")
    private double carbs;

    @Column(name = "fat")
    private double fat;

    @Column(name = "kcal")
    private int kcal;
    //endregion


    //region Getters and setters
    //name
    public String getName() {
        return name;
    }

    //protein
    public double getProtein() {
        return protein;
    }

    //carbs
    public double getCarbs() {
        return carbs;
    }
    //fat
    public double getFat() {
        return fat;
    }

    //kcal
    public int getKcal() {
        return kcal;
    }

    //recipes
    public List<ProductList> getRecipes() {
        return recipes;
    }

    public void setRecipes(List<ProductList> recipes) {
        this.recipes = recipes;
    }
    //endregion


    //region Constructors
    public Product() {}

    public Product(String name, double protein, double carbs, double fat, int kcal) {
        this.name = name;
        this.protein = protein;
        this.carbs = carbs;
        this.fat = fat;
        this.kcal = kcal;
    }
    //endregion


    @Override
    public String toString() {
        return name +" "+ protein +" "+ carbs +" "+ fat +" "+ kcal;
    }

    public String toHtmlTableRow(){
        return String.format("<tr><td>%s</td> <td>%.2f</td> <td>%.2f</td> <td>%.2f</td> <td>%d</td></tr>", name, protein, carbs, fat, kcal);
    }
}