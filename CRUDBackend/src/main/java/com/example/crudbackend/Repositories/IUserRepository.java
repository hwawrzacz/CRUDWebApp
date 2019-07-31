package com.example.crudbackend.Repositories;

import com.example.crudbackend.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;

public interface IUserRepository extends JpaRepository<User, String> {
    ArrayList<User> findByLastName(String lastName);
    User findByLogin(String login);
    void deleteByLogin(String login);
    User getByLoginAndPassword(String login, String password);
}