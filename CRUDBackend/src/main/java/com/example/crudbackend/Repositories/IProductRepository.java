package com.example.crudbackend.Repositories;

import com.example.crudbackend.Models.Product;
import com.example.crudbackend.Models.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductRepository extends JpaRepository<Product, Integer> {
    Iterable<Product> findByNameContaining(String name);
    Product findByName(String name);
}
