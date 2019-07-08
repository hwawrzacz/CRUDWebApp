package com.example.mavenapp;

import com.example.mavenapp.User;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface IUserRepository extends CrudRepository<User, Integer> {
    ArrayList<User> findByLastName(String lastName);
    ArrayList<User> findByLogin(String lastName);
}
