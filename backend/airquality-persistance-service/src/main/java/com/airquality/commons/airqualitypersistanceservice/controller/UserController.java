package com.airquality.commons.airqualitypersistanceservice.controller;

import com.airquality.commons.airqualitypersistanceservice.jwt.JwtTokenUtil;
import com.airquality.commons.airqualitypersistanceservice.jwt.resource.JwtTokenResponse;
import com.airquality.commons.airqualitypersistanceservice.model.PasswordRecoveryDto;
import com.airquality.commons.airqualitypersistanceservice.model.UserDto;
import com.airquality.commons.airqualitypersistanceservice.service.EmailServiceImpl;
import com.airquality.commons.airqualitypersistanceservice.service.UserServiceImpl;
import lombok.NonNull;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserServiceImpl userServiceImpl;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private EmailServiceImpl emailService;

    @PostMapping("/signup")
    public HttpStatus registerUser(@RequestBody UserDto userDto) {
        if (!userServiceImpl.findUserByUsername(userDto.getUsername()).isPresent()) {
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
        Optional<UserDto> userDto = userServiceImpl.findUserByUsername(email);
        if (userDto.isPresent()) {
            String randomToken = RandomStringUtils.randomAlphanumeric(16);
            userDto.get().setResetToken(randomToken);
            //Add 1 hour valability for reset token
            userDto.get().setExpirationDate(userServiceImpl.generateExpirationDateForToken());
            userServiceImpl.createUser(userDto.get());
            emailService.sendForgotPasswordMail(email, randomToken, "http://hartapoluarebrasov.ro");
            return HttpStatus.OK;
        }
        return HttpStatus.BAD_REQUEST;
    }

    @PostMapping("/resetpassword")
    public HttpStatus resetPassword(@RequestBody PasswordRecoveryDto passwordRecoveryDto) {
        Optional<UserDto> userDto = userServiceImpl.findUserByResetToken(passwordRecoveryDto.getToken());
        if (userDto.isPresent() && !passwordRecoveryDto.getPassword().equals("") && !userServiceImpl.isTokenExpired(userDto.get().getExpirationDate())) {
            userDto.get().setPassword(passwordRecoveryDto.getPassword());
            userDto.get().setResetToken("");
            userServiceImpl.createUser(userDto.get());
            return HttpStatus.OK;
        }
        return HttpStatus.NOT_FOUND;
    }

    @PostMapping("/socialsignup")
    public ResponseEntity socialSignup(@RequestBody @NonNull UserDto userDto) {
        if (!userServiceImpl.findUserByUsername(userDto.getUsername()).isPresent()) {
            // Creating user's account
            UserDto user = new UserDto();
            user.setId(System.currentTimeMillis());
            user.setUsername(userDto.getUsername());
            user.setName(userDto.getName());
            user.setPassword(userDto.getPassword());
            userServiceImpl.createUser(user);
            //Generate JWT Token
            final String token = jwtTokenUtil.generateToken(userDto);
            return ResponseEntity.ok(new JwtTokenResponse(token));
        } else {
            UserDto user = userServiceImpl.loadUserByUsername(userDto.getUsername());
            user.setName(userDto.getName());
            userServiceImpl.createUser(user);
            //Generate JWT Token
            final String token = jwtTokenUtil.generateToken(userDto);
            return ResponseEntity.ok(new JwtTokenResponse(token));
        }
    }

    @PostMapping("/isTokenExpired")
    public HttpStatus isTokenExpired(@RequestBody @NonNull String token) {
        Optional<UserDto> userDto = userServiceImpl.findUserByResetToken(token);
        if(userDto.isPresent()){
            if(!userServiceImpl.isTokenExpired(userDto.get().getExpirationDate()))
                return HttpStatus.OK;
            else
                return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.BAD_REQUEST;
    }
    @GetMapping("/myEmailFromToken/{text}")
    public String myEmail(@PathVariable String text) {
        return jwtTokenUtil.getEmailFromToken(text);
    }

    @PostMapping("/something")
    public String test() {
        return "Hello";
    }
}
