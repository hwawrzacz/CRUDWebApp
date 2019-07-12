package com.example.crudbackend.Repositories;

import com.example.crudbackend.Models.Product;
import com.example.crudbackend.Models.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;


public interface IRecipeRepository extends JpaRepository<Recipe, Integer> {
    Iterable<Recipe> findAllByNameContaining(String name);
    Recipe findById(int id);
}
