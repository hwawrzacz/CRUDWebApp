package com.example.crudbackend.Controllers;

import com.example.crudbackend.Models.Admin;
import com.example.crudbackend.Models.Product;
import com.example.crudbackend.Models.User;
import com.example.crudbackend.Repositories.IProductRepository;
import com.example.crudbackend.Repositories.IUserRepository;
import com.example.crudbackend.Repositories.IAdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/users")
public class UserController {

    @Autowired
    IAdminRepository adminRepository;

    @Autowired
    private IUserRepository userRepository;


    //region Get users
    @RequestMapping("/verifyuser")
    public String verifyUser(@RequestParam("login") String login, @RequestParam("password") String password){
        User user = getUserByLogin(login);
        if (user != null){
            if (user.getPassword().equals(password)){
                if (isAdmin(user.getLogin())){
                    return "Admin access granted";
                }
                return "User access granted";
            }
            else return "Access denied";
        }
        else return "User '"+ login +"' does not exist";
    }

    @RequestMapping("/showallusers")
    public String findAllUsers() {
        String result = "<html><table>" +
                "<tr> <td>Login</td> <td>Imię</td> <td>Nazwisko</td> <td>Hasło</td> <td>Aktywny</td> <td>Administrator</td> </tr>";
        String isAdmin;

        for (User user : userRepository.findAll()) {
            isAdmin = "Nie";
            if (isAdmin(user.getLogin())) isAdmin = "Tak";
            result += "<tr><td>"+ user.getLogin() +"</td><td>"+ user.getFirstName() +"</td><td>"+ user.getLastName() +"</td>" +
                    "<td>"+ user.getPassword() +"</td><td>"+ user.getIsActive() +"</td><td>"+ isAdmin +"</td> </tr>\n";
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


    //region Get admins
    @RequestMapping("/showalladmins")
    public String ShowAdmins(){
        String result = "";
        for (Admin admin: adminRepository.findAll()) {
            result += admin.getLogin()+"\n";
        }
        return result;
    }

    @RequestMapping("/showadminbylogin")
    public String ShowAdminsByLogin(@RequestParam("login") String login){
        return getAdminByLogin(login).toString();
    }

    private boolean isAdmin(String login){
        if (adminRepository.existsAdminByLogin(login)) return true;
        return false;
    }
    //endregion


    //region Add new user
    @RequestMapping("/add")
    public String saveUser(@RequestParam("login") String login, @RequestParam("firstname") String firstName, @RequestParam("lastname") String lastName,
                           @RequestParam("password") String password, boolean isActive){
        try{
            userRepository.save(new User(login, firstName, lastName, password, isActive));
            return "Record added successfully";
        } catch (Exception exc) { return "Error"; }
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


    //region Update user
    //http://localhost:8080/users/update?login=hubwaw&firstname=Hubert&lastname=wawrzacz&password=qwertyuiop&isadmin=true&isactive=true
    @RequestMapping("/update")
    public String updateUser(@RequestParam("login") String login, @RequestParam("firstname") String firstName, @RequestParam("lastname") String lastName,
                             @RequestParam("password") String password){
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
    private User getUserByLogin(String login){

        return userRepository.findByLogin(login);
    }

    private Admin getAdminByLogin(String login){

        return adminRepository.findByLogin(login);
    }
    //endregion
}