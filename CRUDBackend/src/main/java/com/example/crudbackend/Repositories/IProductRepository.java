package com.example.crudbackend.Repositories;

import com.example.crudbackend.Models.Ingredient;
import com.example.crudbackend.Models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductRepository extends JpaRepository<Product, Integer> {
    Product findByProductname(String name);
    Iterable<Product> findByProductnameContaining(String name);
    void deleteByProductname(String name);
}
