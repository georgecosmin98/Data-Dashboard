package com.airquality.commons.airqualitypersistanceservice.controller;

import com.airquality.commons.airqualitypersistanceservice.jwt.JwtTokenUtil;
import com.airquality.commons.airqualitypersistanceservice.model.UserDto;
import com.airquality.commons.airqualitypersistanceservice.repository.UserRepository;
import com.airquality.commons.airqualitypersistanceservice.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserServiceImpl userServiceImpl;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping("/signup")
    public HttpStatus registerUser(@RequestBody UserDto userDto){
        if(!userRepository.findByUsername(userDto.getUsername()).isPresent()) {
            // Creating user's account
            UserDto user = new UserDto();
            user.setId(System.currentTimeMillis());
            user.setUsername(userDto.getUsername());
            user.setName(userDto.getName());
            user.setPassword(userDto.getPassword());
            userServiceImpl.createUser(user);
            return HttpStatus.OK;
        }
        return HttpStatus.BAD_REQUEST;
    }

    @GetMapping("/myEmailFromToken/{text}")
    public String myEmail(@PathVariable String text){
        return jwtTokenUtil.getEmailFromToken(text);
    }

    @PostMapping("/something")
    public String test(){
        return "Hello";
    }
}
