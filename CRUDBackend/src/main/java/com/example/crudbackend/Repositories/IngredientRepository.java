package com.example.crudbackend.Repositories;

import com.example.crudbackend.Models.Ingredient;
import com.example.crudbackend.Models.IngredientId;
import com.example.crudbackend.Models.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
    void deleteAllByRecipe(Recipe recipe);
    //void deleteAllByRecipeid(long id);
}
