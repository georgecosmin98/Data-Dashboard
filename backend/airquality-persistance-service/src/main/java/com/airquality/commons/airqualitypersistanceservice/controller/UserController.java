package com.airquality.commons.airqualitypersistanceservice.controller;

import com.airquality.commons.airqualitypersistanceservice.model.UserDto;
import com.airquality.commons.airqualitypersistanceservice.repository.UserRepository;
import com.airquality.commons.airqualitypersistanceservice.service.UserServiceImpl;
import io.netty.handler.codec.base64.Base64Encoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserServiceImpl userServiceImpl;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create")
    public UserDto create(@RequestBody UserDto userDto) {
        return userServiceImpl.createUser(userDto);
    }

    @PostMapping("/signup")
    public HttpStatus registerUser(@RequestBody UserDto userDto){
        if(userRepository.findByEmail(userDto.getEmail()).isEmpty()) {
            // Creating user's account
            UserDto user = new UserDto();
            user.setUsername(userDto.getUsername());
            user.setEmail(userDto.getEmail());
            user.setPassword(userDto.getPassword());
            user.setImageUrl("");
            user.setRole("USER");
            userServiceImpl.createUser(user);
            return HttpStatus.OK;
        }
        return HttpStatus.BAD_REQUEST;
    }

    @GetMapping("/test1")
    public List<UserDto> test1(){
        return userRepository.findByEmail("ha@hat.com");
    }
}