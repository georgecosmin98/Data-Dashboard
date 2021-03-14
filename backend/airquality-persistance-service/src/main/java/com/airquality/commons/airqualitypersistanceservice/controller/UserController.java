package com.airquality.commons.airqualitypersistanceservice.controller;

import com.airquality.commons.airqualitypersistanceservice.jwt.JwtTokenUtil;
import com.airquality.commons.airqualitypersistanceservice.model.PasswordRecoveryDto;
import com.airquality.commons.airqualitypersistanceservice.model.UserDto;
import com.airquality.commons.airqualitypersistanceservice.repository.UserRepository;
import com.airquality.commons.airqualitypersistanceservice.service.EmailServiceImpl;
import com.airquality.commons.airqualitypersistanceservice.service.UserServiceImpl;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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

    @Autowired
    private EmailServiceImpl emailService;

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

    @PostMapping("/forgotpassword")
    public HttpStatus forgotPassword(@RequestBody String email) {
        Optional<UserDto> userDto = userRepository.findByUsername(email);
        if (userDto.isPresent()) {
            String randomToken = RandomStringUtils.randomAlphanumeric(16);
            userDto.get().setResetToken(randomToken);
            userRepository.save(userDto.get());
            emailService.sendForgotPasswordMail(email, randomToken, "http://localhost:3000");
            return HttpStatus.OK;
        }
        return HttpStatus.BAD_REQUEST;
    }

    @PostMapping("/resetpassword")
    public HttpStatus resetPassword(@RequestBody PasswordRecoveryDto passwordRecoveryDto){
        Optional<UserDto> userDto = userRepository.findByResetToken(passwordRecoveryDto.getToken());
        if(userDto.isPresent() && !passwordRecoveryDto.getPassword().equals("")){
            userDto.get().setPassword(passwordRecoveryDto.getPassword());
            userDto.get().setResetToken("");
            userRepository.save(userDto.get());
            return HttpStatus.OK;
        }
        return HttpStatus.NOT_FOUND;
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
