package com.example.crudbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.util.ArrayList;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private IUserRepository userRepository;

    //region Messaging
    @RequestMapping("/hello")
    public String sayHello(){
        return "I'm saying hello";
    }

    @RequestMapping("/error")
    public String error (){
        return "Error occurred";
    }
    //endregion

    @RequestMapping("/showadmins")
    public String showAdmins(){
        String result = "<html><table>";
        result += "<tr> <td>Login</td> </tr>";

        for (User user : userRepository.findAll()) {
            if (user.getIsAdmin())
                result += "<tr><td>" + user.getLogin() + "</td></tr>\n";
        }

        return result + "</table></html>";
    }


    //region Getting users
    @RequestMapping("/verify")
    public String verifyUser(@RequestParam("login") String login, @RequestParam("password") String password){
        User user = getUserByLogin(login);
        if (user != null){
            if (user.getPassword().equals(password)){
                if (user.getIsAdmin()){
                    return "Admin access granted";
                }
                return "User access granted";
            }
            else return "Access denied";
        }
        else return "User '"+ login +"' does not exist";
    }

    @RequestMapping("/showall")
    public String findAllUsers() {
        String result = "<html><table>";
        result += "<tr> <td>Login</td> <td>Imię</td> <td>Nazwisko</td> <td>Hasło</td> <td>Aktywny</td> </tr>";

        for (User user : userRepository.findAll()) {
            result += "<tr><td>" + user.getLogin() + "</td>" + "<td>" + user.getFirstName() + "</td>" + "<td>" + user.getLastName() + "</td>" +
                    "<td>" + user.getPassword() + "</td>" + "<td>" + user.getIsActive() + "</td> </tr>\n";
        }

        return result + "</table></html>";
    }

//    the same as above, but returns an ArrayList
//    public ArrayList<User> findAllUsers() {
//        ArrayList<User> userList = new ArrayList();
//
//        for (User user : userRepository.findAll()) {
//            //userList.add(user);
//        }
//        return userList;
//    }


    @RequestMapping("/showbylastname")
    public String getUserByLastName(@RequestParam("lastName") String lastName){
        String result = "";

        for(User user: userRepository.findByLastName(lastName)){
            result += user.toString() + "<br>";
        }
        return result;
    }

    @RequestMapping("/showbylogin")
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


    //region Add new user
    @RequestMapping("/add")
    public String saveUser(@RequestParam("login") String login, @RequestParam("firstname") String firstName, @RequestParam("lastname") String lastName,
                           @RequestParam("password") String password, boolean isAdmin, boolean isActive){
        try{
            userRepository.save(new User(login, firstName, lastName, password, isAdmin, isActive));
            return "Record added successfully";
        } catch (Exception exc) { return "Error"; }
    }
    //endregion


    //region Update user
    //http://localhost:8080/users/update?login=hubwaw&firstname=Hubert&lastname=wawrzacz&password=qwertyuiop&isadmin=true&isactive=true
    @RequestMapping("/update")
    public String updateUser(@RequestParam("login") String login, @RequestParam("firstname") String firstName, @RequestParam("lastname") String lastName,
                             @RequestParam("password") String password, @RequestParam("isadmin") boolean isAdmin){
        try{
            userRepository.save(new User(login, firstName, lastName, password, isAdmin, true));
            return "Record added successfully";
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
    private User getUserByLogin(@RequestParam("login") String login){
        return userRepository.findByLogin(login);
    }
    //endregion
}