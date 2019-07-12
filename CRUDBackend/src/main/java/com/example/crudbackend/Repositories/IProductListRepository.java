package com.example.crudbackend.Repositories;

import com.example.crudbackend.Models.Product;
import com.example.crudbackend.Models.ProductList;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface IProductListRepository extends JpaRepository<ProductList, String> {
    List<ProductList> findAll();
    List<ProductList> findAllByAmount(int name);
    List<ProductList> findAllByProduct(Product product);
}
