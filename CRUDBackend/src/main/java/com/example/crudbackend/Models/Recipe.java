package com.example.crudbackend.Models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import net.bytebuddy.agent.builder.AgentBuilder;

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

    //map foreign key in 'productlist' table
    @OneToMany(mappedBy = "recipe",fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<ProductList> products;

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

    //name
    public String getName() {
        return name;
    }

    //description
    public String getDescription() {
        return description;
    }

    //type
    public String getType() {
        return type;
    }

    //recipes
    public List<ProductList> getProducts() {
        return products;
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
