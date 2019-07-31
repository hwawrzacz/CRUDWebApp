package com.example.crudbackend.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity(name = "Recipe")
@Table(name = "recipes")
public class Recipe {

    // region Old version
    // region Fields
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "recipeid")
    private long recipeid;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "additiondate")
    private Date additiondate;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.MERGE, fetch=FetchType.EAGER)
    @JsonIgnore
    @JsonManagedReference(value = "recipe_id_ref")
    private List<Ingredient> ingredients;

    // endregion


    // region Getters and Setters
    // recipeid
    public long getRecipeid() { return recipeid; }
    public void setRecipeid(long recipeid) { this.recipeid = recipeid; }

    // name
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    // type
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }

    public Date getAdditiondate() { return additiondate; }
    public void setAdditiondate(Date additionDate) { this.additiondate = additionDate; }

    // recipes
    public List<Ingredient> getIngredients() { return ingredients; }
    public void setIngredients(List<Ingredient> ingredients) { this.ingredients = ingredients; }

    // description
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    // endregion
    // endregion

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
