package com.example.crudbackend.Controllers;

import com.example.crudbackend.Models.Admin;
import com.example.crudbackend.Models.User;
import com.example.crudbackend.Repositories.IUserRepository;
import com.example.crudbackend.Repositories.IAdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    IAdminRepository adminRepository;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private EntityManager entityManager;

    @GetMapping("/test")
    public Object customQueryMethod(@RequestParam("login") String login){
        return entityManager.createQuery("SELECT user FROM User user WHERE user.login=?1")
                .setParameter(1,login)
                .getSingleResult();
    }

    //region Show users
    @RequestMapping("/showuserbylastname")
    public String getUserByLastName(@RequestParam("lastName") String lastName){
        String result = "";

        for(User user: userRepository.findByLastName(lastName)){
            result += user.toString() + "<br>";
        }
        return result;
    }


    @RequestMapping("/showuserbylogin")
    public String showUserById(String login){
        User user = getUserByLogin(login);
        if (user != null){
            return user.toString();
        }
        else {
            return "User '"+ login +"' does not exist";
        }
    }
    //endregion


    //region Update admin
    @RequestMapping("/grantadminaccess")
    public String grantAdminAccess(@RequestParam("login") String login){
        try{
            adminRepository.save(new Admin(login));
            return "Granted admin access for user '"+ login +"'";
        }
        catch (Exception exc){
            return "User update failed";
        }
    }

    @RequestMapping("/revokeadminaccess")
    public String revokeAdminAccess(@RequestParam("login") String login){
        try{
            adminRepository.deleteById(login);
            return "Revoked admin access for user '"+ login +"'";
        }
        catch (Exception exc){
            return "User update failed";
        }
    }
    //endregion


    //region User
    //create new user
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public String addUser(@RequestBody User user){
        try{
            userRepository.save(user);
            return "Record added successfully";
        } catch (Exception exc) { return "Error"; }
    }

    //update user
    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public String saveUser(@RequestBody User user){
        try{
            userRepository.save(user);
            return "User updated successfully";
        } catch (Exception exc) { return "Error"; }
    }

    @RequestMapping("/deactivate")
    public String deactivateUser(@RequestParam("login") String login){
        if (toggleIsActive(login, false)) return "User '"+ login +"' deactivated";
        else return "User update failed";
    }

    @RequestMapping("/activate")
    public String activateUser(@RequestParam("login") String login){
        if (toggleIsActive(login, true)) return "User '"+ login +"' activated";
        else return "User update failed";
    }
    //endregion


    private boolean toggleIsActive(String login, boolean isActive){
        User userToUpdate = getUserByLogin(login);
        if (userToUpdate != null) { //if user with given login exists
            userToUpdate.setIsActive(isActive);
            userRepository.save(userToUpdate);
            return true;
        }
        else{
            return false;
        }
    }
    //endregion


    //region Get user functions
    @RequestMapping("/getallusers")
    public Iterable<User> getAllUsers(){
        return userRepository.findAll();
    }


    private User getUserByLogin(String login){

        return userRepository.findByLogin(login);
    }

    private Admin getAdminByLogin(String login){

        return adminRepository.findByLogin(login);
    }
    //endregion
}