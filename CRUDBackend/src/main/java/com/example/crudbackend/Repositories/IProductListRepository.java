package com.example.crudbackend.Repositories;

import com.example.crudbackend.Models.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductListRepository extends JpaRepository<Ingredient, String> {
}
