package com.example.crudbackend.Repositories;

import com.example.crudbackend.Models.User;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface IUserRepository extends CrudRepository<User, String> {
    ArrayList<User> findByLastName(String lastName);
    User findByLogin(String lastName);
}