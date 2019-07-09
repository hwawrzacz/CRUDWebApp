package com.example.crudbackend.Repositories;

import com.example.crudbackend.Models.Admin;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface IAdminRepository extends CrudRepository<Admin, String> {
    Admin findByLogin(String login);
    boolean existsAdminByLogin(String login);
}
