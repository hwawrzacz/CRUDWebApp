package com.example.crudbackend.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

@Entity(name = "Product")
@Table(name = "products")
public class Product {

    // region Old version
    //region Fields
    @Id
    @Column(name = "productname")
    private String productname;

    @Column(name = "protein")
    private double protein;

    @Column(name = "carbs")
    private double carbs;

    @Column(name = "fat")
    private double fat;

    @Column(name = "kcal")
    private int kcal;

    @OneToMany(mappedBy = "product", cascade = CascadeType.MERGE , fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Ingredient> recipes;
    //endregion


    //region Getters and setters
    //name
    public String getProductname() { return productname; }
    public void setProductname(String productname) { this.productname = productname; }

    //protein
    public double getProtein() {
        return protein;
    }
    public void setProtein(double protein) {
        this.protein = protein;
    }

    //carbs
    public double getCarbs() {
        return carbs;
    }
    public void setCarbs(double carbs) {
        this.carbs = carbs;
    }

    //fat
    public double getFat() {
        return fat;
    }
    public void setFat(double fat) {
        this.fat = fat;
    }

    //kcal
    public int getKcal() {
        return kcal;
    }
    public void setKcal(int kcal) {
        this.kcal = kcal;
    }

    // recipes
    public List<Ingredient> getRecipes() { return recipes; }
    public void setRecipes(List<Ingredient> recipes) { this.recipes = recipes; }
    //endregion
    // endregion


//    // region New version
//    //region Fields
//    @Id
//    @Column(name = "productname")
//    private String productname;
//
//    @Column(name = "protein")
//    private double protein;
//
//    @Column(name = "carbs")
//    private double carbs;
//
//    @Column(name = "fat")
//    private double fat;
//
//    @Column(name = "kcal")
//    private int kcal;
//    //endregion
//
//
//    //region Getters and setters
//
//    public String getProductname() { return productname; }
//    public void setProductname(String productname) { this.productname = productname; }
//
//    //protein
//    public double getProtein() {
//        return protein;
//    }
//    public void setProtein(double protein) {
//        this.protein = protein;
//    }
//
//    //carbs
//    public double getCarbs() {
//        return carbs;
//    }
//    public void setCarbs(double carbs) {
//        this.carbs = carbs;
//    }
//
//    //fat
//    public double getFat() {
//        return fat;
//    }
//    public void setFat(double fat) {
//        this.fat = fat;
//    }
//
//    //kcal
//    public int getKcal() {
//        return kcal;
//    }
//    public void setKcal(int kcal) {
//        this.kcal = kcal;
//    }
//    //endregion
//
//    // endregion


    //region Constructors
    public Product() {}

    public Product(String productname, double protein, double carbs, double fat, int kcal) {
        this.productname = productname;
        this.protein = protein;
        this.carbs = carbs;
        this.fat = fat;
        this.kcal = kcal;
    }
    //endregion


    @Override
    public String toString() {
        return productname +" "+ protein +" "+ carbs +" "+ fat +" "+ kcal;
    }
}