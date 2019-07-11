package com.example.crudbackend.Repositories;

import com.example.crudbackend.Models.ProductList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductListRepository extends JpaRepository<ProductList, String> {
}
