package com.example.crudbackend.Models;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "recipes")
public class Recipe {

    //region Fields
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "recipeid")
    private int recipeid;

    //map foreign key in 'productlist' table
    @OneToMany(mappedBy = "recipe",fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<ProductList> ingredients;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "type")
    private String type;

    @Column(name = "additiondate")
    private String additionDate;
    //endregion


    //region Getters and Setters
    //recipeid
    public int getRecipeid() {
        return recipeid;
    }
    public void setRecipeid(int recipeid) {
        this.recipeid = recipeid;
    }

    //name
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    //description
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    //type
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }

    //recipes
    public List<ProductList> getIngredients() { return ingredients; }

    public String getAdditiondate() {
        return additionDate;
    }
    //endregion


    //region Constructors
    public Recipe(){}

    public Recipe(String name, String description, String type){
        this.name = name;
        this.description = description;
        this.type = type;
    }
    //endregion

    @Override
    public String toString(){
        return recipeid +" "+ name +" "+ description +" "+ type;
    }
}
