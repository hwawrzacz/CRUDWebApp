package com.example.crudbackend.Models;

import javax.persistence.*;

@Entity
@Table(name = "admins")
public class Admin {

    @Id
    @Column(name = "login")
    private String login;


    public String getLogin() { return login; }
    public void setLogin(String login) { this.login = login; }


    public Admin(){}

    public Admin(String login){
        this.login = login;
    }

}
