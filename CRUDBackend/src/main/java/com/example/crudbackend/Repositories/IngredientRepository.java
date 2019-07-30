package com.example.crudbackend.Repositories;

import com.example.crudbackend.Models.Ingredient;
import com.example.crudbackend.Models.IngredientId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<Ingredient, IngredientId> {
}
