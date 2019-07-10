package com.example.crudbackend.Models;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "recipes")
public class Recipe {

    //region Fields
    @Id
    @Column(name = "recipeid")
    private int recipeid;

    @OneToMany(mappedBy = "recipe",fetch = FetchType.EAGER)
    private List<ProductList> recipes;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "type")
    private String type;
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
