package com.example.crudbackend.Repositories;

import com.example.crudbackend.Models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductRepository extends JpaRepository<Product, Integer> {
    Iterable<Product> findByProductnameContaining(String name);
    Product findByProductname(String name);
}
