package com.example.crudbackend.Repositories;

import com.example.crudbackend.Models.Product;
import org.springframework.data.repository.CrudRepository;

import java.awt.*;

public interface IProductRepository extends CrudRepository<Product, Integer> {
    Iterable<Product> findByNameContaining(String name);
}
