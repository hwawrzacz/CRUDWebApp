package com.example.crudbackend.Models;

import javax.persistence.*;

@Entity
@Table(name = "recipes")
public class Recipe {

    //region Fields
    @Id
    @Column(name = "recipeID")
    private int recipeID;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "type")
    private String type;
    //endregion


    //region Getters and Setters
    //id
    public int getRecipeID() {
        return recipeID;
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
    //endregion


    //region Constructors
    public Recipe(){}

    public Recipe(String name, String description, String type){
        this.name = name;
        this.description = description;
        this.type = type;
    }
    //endregion
}
