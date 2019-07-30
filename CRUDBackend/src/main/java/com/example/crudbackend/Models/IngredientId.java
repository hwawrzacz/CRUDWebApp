package com.example.crudbackend.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class IngredientId implements Serializable {

    private Recipe recipe;

    private Product product;

//    private long recipeid;
//    private String productname;

    // region Getters and setters


    //recipe
    public Recipe getRecipe() { return recipe; }
    public void setRecipe(Recipe recipe) { this.recipe = recipe; }

    // product
    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

//    // productname
//    public String getProductname() { return productname; }
//    public void setProductname(String productname) { this.productname = productname; }
//
//    // recipeid
//    public Long getRecipeid() { return recipeid; }
//    public void setRecipeid(Long recipeid) { this.recipeid = recipeid; }
    // endregion


    // region Constructors
    public IngredientId() { }

    public IngredientId(Recipe recipeid, Product productname) {
        this.recipe = recipeid;
        this.product = productname;
    }
    // endregion

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof IngredientId)) return false;

        IngredientId checkedObject = (IngredientId) obj;
        return (checkedObject.product == this.product && checkedObject.recipe == this.recipe);
    }

    @Override
    public int hashCode() {
        return Objects.hash(getRecipe(), getProduct());
    }
}
