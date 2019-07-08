package com.example.crudbackend.Repositories;

import com.example.crudbackend.Models.Admin;
import org.springframework.data.repository.CrudRepository;

public interface IAdminRepository extends CrudRepository<Admin, String> {
    Admin findByLogin(String login);
}
