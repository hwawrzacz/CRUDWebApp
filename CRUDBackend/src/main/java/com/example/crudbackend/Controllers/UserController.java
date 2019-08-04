package com.example.crudbackend.Controllers;

import com.example.crudbackend.Models.User;
import com.example.crudbackend.Repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private EntityManager entityManager;

    //region Show users
    @RequestMapping("/showuserbylastname")
    public String getUserByLastName(@RequestParam("lastName") String lastName) {
        String result = "";

        for (User user : userRepository.findByLastName(lastName)) {
            result += user.toString() + "<br>";
        }
        return result;
    }

    @GetMapping("/getallbylogin")
    public Iterable<User> getAllByLogin(@RequestParam("login") String login){
        return userRepository.getByLoginContainingIgnoreCaseOrderByLoginAsc(login);
    }

    @RequestMapping("/showuserbylogin")
    public String showUserById(String login) {
        User user = getUserByLogin(login);
        if (user != null) {
            return user.toString();
        } else {
            return "User '" + login + "' does not exist";
        }
    }
    //endregion


    //region User
    //create user
    @PostMapping("/create")
    @Transactional
    public String createUser(@RequestBody User user) {
        if (doesUserExist(user.getLogin())) {
            return addUser(user);
        } else {
            return "User already exists";
        }
    }

    //update user
    @PutMapping("/update")
    @Transactional
    public String updateUser(@RequestParam("login") String login, @RequestBody User user) {
        System.out.println(user.getLogin() + ' ' + user.getFirstName() + ' ' + user.getLastName() + ' ' + user.getIsActive() + ' ' + user.getIsAdmin());
        return this.saveUser(login, user);
    }

    //delete user
    @DeleteMapping(value = "/delete")
    @Transactional
    public String deleteUser(@RequestParam("login") String login) {
        userRepository.deleteByLogin(login);
        return "deleted";
    }

    @RequestMapping("/deactivate")
    public String deactivateUser(@RequestParam("login") String login) {
        if (toggleIsActive(login, false)) return "User '" + login + "' deactivated";
        else return "User update failed";
    }

    @RequestMapping("/activate")
    public String activateUser(@RequestParam("login") String login) {
        if (toggleIsActive(login, true)) return "User '" + login + "' activated";
        else return "User update failed";
    }

    @PostMapping("/login")
    public User getUserByLoginAndPassword(@RequestBody User user){
        return userRepository.getByLoginAndPassword(user.getLogin(), user.getPassword());
    }

    private boolean doesUserExist(String login) {
        return (userRepository.findByLogin(login) == null);
    }

    private String addUser(User user) {
        try {
            userRepository.save(user);
            return "Record added successfully";
        } catch (Exception exc) {
            return "Error";
        }
    }

    private String saveUser(String login, User updatedUser) {
        try {
            User user = userRepository.findByLogin(login);
            user.setFirstName(updatedUser.getFirstName());
            user.setLastName(updatedUser.getLastName());
            user.setPassword(updatedUser.getPassword());
            user.setIsActive(updatedUser.getIsActive());
            user.setIsAdmin(updatedUser.getIsAdmin());
            userRepository.save(user);

            return "User updated";
        } catch (Exception exc) {
            return "User counldn't be updated. Error: " + exc.getMessage();
        }
    }
    //endregion


    private boolean toggleIsActive(String login, boolean isActive) {
        User userToUpdate = getUserByLogin(login);
        if (userToUpdate != null) { //if user with given login exists
            userToUpdate.setIsActive(isActive);
            userRepository.save(userToUpdate);
            return true;
        } else {
            return false;
        }
    }
    //endregion


    //region Get user functions
    @RequestMapping("/getallusers")
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }


    private User getUserByLogin(String login) {

        return userRepository.findByLogin(login);
    }
    //endregion
}
