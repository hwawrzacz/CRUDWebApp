package com.example.crudbackend.Repositories;

import com.example.crudbackend.Models.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;


public interface IRecipeRepository extends JpaRepository<Recipe, Long> {
    Iterable<Recipe> findAllByNameContaining(String name);
    Recipe findByRecipeid(int id);
}
