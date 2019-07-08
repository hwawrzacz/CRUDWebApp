package com.example.mavenapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class WebController {

    @Autowired
    IUserRepository userRepository;

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


    //region Getting users
    @RequestMapping("/showall")
    public String findAll() {
        String result = "<html><table>";
        result += "<tr> <td>Login</td> <td>Imię</td> <td>Nazwisko</td> <td>Hasło</td> <td>Aktywny</td> </tr>";

        for (User user : userRepository.findAll()) {
            result += "<tr><td>" + user.getLogin() + "</td>" + "<td>" + user.getFirstName() + "</td>" + "<td>" + user.getLastName() + "</td>" +
                    "<td>" + user.getPassword() + "</td>" + "<td>" + user.getIsActive() + "</td>" + "</tr>\n";
        }
        return result + "</table></html>";
    }

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
    public String saveUser(@RequestParam("login") String login, @RequestParam("firstName") String firstName,
                           @RequestParam("lastName") String lastName, @RequestParam("password") String password, boolean isActive){
        try{
            userRepository.save(new User(login, firstName, lastName, password, isActive));
            return "Record added successfully";
        } catch (Exception exc) { return "Error"; }
    }
    //endregion


    //region Update user
    @RequestMapping("/update")
    public String updateUser(@RequestParam("login") String login, @RequestParam("firstName") String firstName, @RequestParam("lastName") String lastName, @RequestParam("password") String password){
        try{
            userRepository.save(new User(login, firstName, lastName, password, true));
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
        try{
            User user = userRepository.findByLogin(login).get(0);
            return user;
        } catch (Exception exc){
            System.out.printf(exc.getMessage());
            return null;
        }
    }
    //endregion
}