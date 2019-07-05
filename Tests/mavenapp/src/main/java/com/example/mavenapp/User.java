package com.example.mavenapp;

import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table(name = "users")
public class User{

    //region Fields
    @Id
    @Column(name = "login")
    private String login;

    @Column(name = "firstname")
    private String firstName;

    @Column(name = "lastname")
    private String lastName;

    @Column(name="password")
    private String password;

    @Column(name="isactive")
    private boolean isactive;
    //endregion

    //region Getters and setters
    //login
    public void setLogin(String login) {
        this.login = login;
    }

    public String getLogin() {
        return login;
    }

    //firstName
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getFirstName() {
        return firstName;
    }

    //lastName
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getLastName() {
        return lastName;
    }

    //password
    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }
    //endregion

    //region Constuctors
    public User() {}

    public User(String login, String firstName, String lastName, String password, boolean isActive){
        this.login = login;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.isactive = isActive;
    }
    //endregion

    @Override
    public String toString(){
        return login +" "+ firstName +" "+ lastName;
    }

}