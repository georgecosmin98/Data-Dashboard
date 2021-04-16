package com.airquality.commons.airqualitypersistanceservice.controller;

import com.airquality.commons.airqualitypersistanceservice.jwt.JwtTokenUtil;
import com.airquality.commons.airqualitypersistanceservice.jwt.resource.JwtTokenResponse;
import com.airquality.commons.airqualitypersistanceservice.model.*;
import com.airquality.commons.airqualitypersistanceservice.service.EmailServiceImpl;
import com.airquality.commons.airqualitypersistanceservice.service.UserServiceImpl;
import lombok.NonNull;
import org.apache.commons.lang3.RandomStringUtils;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
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

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public HttpStatus registerUser(@RequestBody UserDto userDto) {
        //Verify if password is too short
        if (userDto.getPassword().length() < 5)
            return HttpStatus.BAD_REQUEST;

        if (!userServiceImpl.findUserByUsername(userDto.getUsername()).isPresent()) {
            // Creating user's account
            UserDto user = new UserDto();
            user.setUsername(userDto.getUsername());
            user.setName(userDto.getName());
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
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
        //Verify if password is too short
        if (passwordRecoveryDto.getPassword().length() < 5)
            return HttpStatus.BAD_REQUEST;
        Optional<UserDto> userDto = userServiceImpl.findUserByResetToken(passwordRecoveryDto.getToken());
        if (userDto.isPresent() && !passwordRecoveryDto.getPassword().equals("") && !userServiceImpl.isResetTokenExpired(userDto.get().getExpirationDate())) {
            userDto.get().setPassword(passwordEncoder.encode(passwordRecoveryDto.getPassword()));
            userDto.get().setResetToken("");
            userServiceImpl.createUser(userDto.get());
            return HttpStatus.OK;
        }
        return HttpStatus.NOT_FOUND;
    }

    @PostMapping("/changepassword")
    public HttpStatus changePassword(@RequestBody ChangePasswordDto changePasswordDto) {
        //Verify if password is too short
        if (changePasswordDto.getPassword().length() < 5)
            return HttpStatus.BAD_REQUEST;
        Optional<UserDto> userDto = userServiceImpl.findUserByUsername(changePasswordDto.getUsername());
        if (userDto.isPresent()) {
            userDto.get().setPassword(passwordEncoder.encode(changePasswordDto.getPassword()));
            userServiceImpl.createUser(userDto.get());
            return HttpStatus.OK;
        }
        return HttpStatus.NOT_FOUND;
    }

    @PostMapping("/socialsignup")
    public ResponseEntity socialSignup(@RequestBody @NonNull SocialLoginDto socialLoginDto) throws IOException, ParseException {

        UserDto socialUser = userServiceImpl.getUserDetailsFromProvider(socialLoginDto.getId(), socialLoginDto.getProvider(), socialLoginDto.getToken());
        if (socialUser != null) {
            if (!userServiceImpl.findUserByUsername(socialUser.getUsername()).isPresent()) {
                // Creating user's account
                UserDto user = new UserDto();
                user.setUsername(socialUser.getUsername());
                user.setName(socialUser.getName());
                user.setPassword(socialUser.getPassword());
                userServiceImpl.createUser(user);
                //Generate JWT Token
                final String token = jwtTokenUtil.generateToken(socialUser);
                return ResponseEntity.ok(new JwtTokenResponse(token));
            } else {
                UserDto user = userServiceImpl.loadUserByUsername(socialUser.getUsername());
                userServiceImpl.createUser(user);
                //Generate JWT Token
                final String token = jwtTokenUtil.generateToken(socialUser);
                return ResponseEntity.ok(new JwtTokenResponse(token));
            }
        } else
            return null;
    }

    @PostMapping("/isTokenExpired")
    public HttpStatus isTokenExpired(@RequestBody @NonNull String token) {
        Optional<UserDto> userDto = userServiceImpl.findUserByResetToken(token);
        if (userDto.isPresent()) {
            if (!userServiceImpl.isResetTokenExpired(userDto.get().getExpirationDate()))
                return HttpStatus.OK;
            else
                return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.BAD_REQUEST;
    }

    @GetMapping("/retrieveUserDetails")
    private UserGeneralInfoDto retriveUserDetails(HttpServletRequest request) {
        UserGeneralInfoDto userGeneralInfoDto = new UserGeneralInfoDto();
        Optional<UserDto> userDto = userServiceImpl.findUserByUsername(userServiceImpl.getUsernameFromRequestHeader(request));
        userGeneralInfoDto.setAddress(userDto.get().getAddress());
        userGeneralInfoDto.setName(userDto.get().getName());
        return userGeneralInfoDto;
    }

    @PostMapping("/changeUserDetails")
    private HttpStatus userGeneralInfoDto(HttpServletRequest request, @RequestBody UserGeneralInfoDto userGeneralInfoDto) {
        Optional<UserDto> userDto = userServiceImpl.findUserByUsername(userServiceImpl.getUsernameFromRequestHeader(request));
        if (userDto.isPresent()) {
            userDto.get().setName(userGeneralInfoDto.getName());
            userDto.get().setAddress(userGeneralInfoDto.getAddress());
            userServiceImpl.createUser(userDto.get());
            return HttpStatus.OK;
        } else
            return HttpStatus.BAD_REQUEST;
    }

    @GetMapping("/myEmailFromToken/{text}")
    public String myEmail(@PathVariable String text) {
        return jwtTokenUtil.getEmailFromToken(text);
    }

    @PostMapping("/something/{id}/{provider}/{token}")
    public UserDto test(@PathVariable String id, @PathVariable String provider, @PathVariable String token) throws IOException, ParseException {
        return userServiceImpl.getUserDetailsFromProvider(id, provider, token);
    }
}
