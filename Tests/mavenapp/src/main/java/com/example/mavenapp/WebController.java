package com.example.mavenapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class WebController {

    @Autowired
    IUserRepository userRepository;

    @RequestMapping("/hello")
    public String sayHello(){
        return "I'm saying hello";
    }

    @RequestMapping("/error")
    public String error (){
        return "Error occurred";
    }

    @RequestMapping("/findall")
    public String findAll() {
        String result = "<html>";

        for (User user : userRepository.findAll()) {
            result += "<div>" + user.toString() + "</div>\n";
        }
        return result + "</html>";
    }

    @RequestMapping("/save")
    public String saveUser(){
        try{
            userRepository.save(new User("julisk", "Julia", "Iskiorka", "qwertyuiop", true));
            return "Record added successfully";
        } catch (Exception exc) { return "Error"; }
    }

    @RequestMapping("/findbylastname")
    public String fetchDataByLastName(@RequestParam("lastName") String lastName){
        String result = "";

        for(User user: userRepository.findByLastName(lastName)){
            result += user.toString() + "<br>";
        }
        return result;
    }

//    @GetMapping("/get")
//    public Optional<User> getByID(@RequestParam String someID)
//    {
//        return userRepository.findById(Integer.parseInt(someID));
//    }
}

//    @RequestMapping(value = "/save",method = RequestMethod.GET )
//    public String process(){
//        try{
//            userRepository.save(new User("Hubert", "Wawrzacz"));
//            userRepository.save(new User("Szymon", "Lipiec"));
//            return "Done";
//        } catch (Exception exc) { return "Error"; }
//    }
//
//    @RequestMapping("/hello")
//    public String Hello(){
//        return String.format("Welcome");
//    }
//
//    @RequestMapping("/findall")
//    public String findAll() {
//        String result = "<html>";
//
//        for (User user : userRepository.findAll()) {
//            result += "<div>" + user.toString() + "</div>\n";
//        }
//
//        return result + "</html>";
//    }
//
//    @RequestMapping("/findbyid")
//    public Optional findById(@RequestParam("id") long id){
//        Optional result;
//        result = userRepository.findById(id);
//        return result;
//    }
//}

