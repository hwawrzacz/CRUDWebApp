package com.example.crudbackend.Models;

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
    private boolean isActive;
    //endregion

    //region Getters and setters
    //login
    public String getLogin() {
        return login;
    }
    public void setLogin(String login) {
        this.login = login;
    }

    //firstName
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    //lastName
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    //password
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    //isActive
    public boolean getIsActive() { return isActive; }
    public void setIsActive(boolean isActive) { this.isActive = isActive; }
    //endregion

    //region Constructors
    public User() {}

    public User(String login, String firstName, String lastName, String password, boolean isActive){
        this.login = login;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.password = password;
        this.isActive = isActive;
    }
    //endregion

    @Override
    public String toString(){
        return login +" "+ firstName +" "+ lastName;
    }

}