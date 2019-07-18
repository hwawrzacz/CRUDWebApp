package com.example.crudbackend.Models;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "products")
public class Product {

    //region Fields
    @Id
    @Column(name = "productname")
    //private String name;
    private String productname;

    //map foreign key in 'productlist' table
    @OneToMany(mappedBy = "product",fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<ProductList> products;

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
//    public String getName() { return name; }
//    public void setName(String name) {
//        this.productname = name;
//        this.name = name;
//    }

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
    //endregion


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

    public String toHtmlTableRow(){
        return String.format("<tr><td>%s</td> <td>%.2f</td> <td>%.2f</td> <td>%.2f</td> <td>%d</td></tr>", productname, protein, carbs, fat, kcal);
    }
}