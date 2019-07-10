package com.example.crudbackend.Repositories;

import com.example.crudbackend.Models.ProductList;
import com.example.crudbackend.Models.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductListRepository extends JpaRepository<ProductList, String> {
    Iterable<ProductList> findAllByRecipe(Recipe recipe);
}
