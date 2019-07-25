package com.example.crudbackend.Models;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "recipes")
public class Recipe {

    //region Fields
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "recipeid")
    private int recipeid;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "additiondate")
    private String additiondate;

    @Column(name = "description")
    private String description;

    //map foreign key in 'productlist' table
    @OneToMany(mappedBy = "recipe",fetch = FetchType.EAGER)
    @JsonManagedReference(value = "recipeid")
    private List<Ingredient> ingredients;

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

    //type
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }

    public String getAdditiondate() {
        return additiondate;
    }
    public void setAdditiondate(String additionDate) { this.additiondate = additionDate; }

    //recipes
    public List<Ingredient> getIngredients() { return ingredients; }
    public void setIngredients(List<Ingredient> ingredients) { this.ingredients = ingredients; }

    //description
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
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
