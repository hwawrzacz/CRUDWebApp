package com.example.crudbackend.Controllers;

import com.example.crudbackend.Models.Admin;
import com.example.crudbackend.Models.User;
import com.example.crudbackend.Repositories.IUserRepository;
import com.example.crudbackend.Repositories.IAdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import javax.transaction.UserTransaction;

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

    @GetMapping("/updateuser")

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
    //create user
    @PostMapping("/create")
    @Transactional
    public String createUser(@RequestBody User user){
        if (doesUserExist(user.getLogin())){
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
        return this.executeUpdateUserQuery(login, user);
    }

    //delete user
    @DeleteMapping(value = "/delete")
    @Transactional
    public String deleteUser(@RequestParam("login") String login){
        //return this.executeDeleteUserQuery(login);
        userRepository.deleteByLogin(login);
        return "deleted";
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


    private boolean doesUserExist(String login) {
        return (userRepository.findByLogin(login) == null);
    }

    private String addUser(User user){
        try{
            userRepository.save(user);
            return "Record added successfully";
        } catch (Exception exc) {
            return "Error";
        }
    }

    private String executeUpdateUserQuery(String login, User updatedUser){
        try {
            entityManager.createQuery("UPDATE User user SET user.login=?1, user.firstName=?2, user.lastName=?3, user.isActive=?4, user.isAdmin=?5 WHERE user.login=?6")
                    .setParameter(1, updatedUser.getLogin())
                    .setParameter(2, updatedUser.getFirstName())
                    .setParameter(3, updatedUser.getLastName())
                    .setParameter(4, updatedUser.getIsActive())
                    .setParameter(5, updatedUser.getIsAdmin())
                    .setParameter(6, login)
                    .executeUpdate();
            return "User updated";
        }
        catch (Exception exc){
            return "User counldn't be updated. Error: " + exc.getMessage();
        }
    }

    public String executeDeleteUserQuery(String login){
        try{
            entityManager.createNativeQuery("DELETE FROM User user WHERE user.login=?1")
                    .setParameter(1, login)
                    .executeUpdate();
            return "User deleted";
        } catch (Exception exc){
            return "User couldn't be deleted. Error message: " + exc.getMessage();
        }
    }
    private String deleteUser(User user){
        try{
            userRepository.delete(user);
            return "User deleted";
        } catch (Exception exc){
            return "User couldn't be deleted. Error message: " + exc.getMessage();
        }
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