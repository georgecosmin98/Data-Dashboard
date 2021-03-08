package com.airquality.commons.airqualitypersistanceservice.jwt.resource;

import com.airquality.commons.airqualitypersistanceservice.jwt.JwtTokenUtil;
import com.airquality.commons.airqualitypersistanceservice.model.UserDto;
import com.airquality.commons.airqualitypersistanceservice.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin("*")
public class JwtAuthenticationRestController {

    @Value("${jwt.http.request.header}")
    private String tokenHeader;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserServiceImpl userService;

    //In this method we create authentication toekn
    @RequestMapping(value = "${jwt.get.token.uri}", method = RequestMethod.POST)
    public ResponseEntity createAuthenticationToken(@RequestBody JwtTokenRequest authenticationRequest) {
        //Load user information from database
        UserDto userDto = userService.loadUserByUsername(authenticationRequest.getUsername());
        //Verify if requested user have correct credentials
        if (userDto.getPassword().equals(authenticationRequest.getPassword())) {
            final String token = jwtTokenUtil.generateToken(userDto);
            return ResponseEntity.ok(new JwtTokenResponse(token));
        } else
            return ResponseEntity.badRequest().body(null);
    }

    @RequestMapping(value = "${jwt.refresh.token.uri}", method = RequestMethod.GET)
    public ResponseEntity refreshAndGetAuthenticationToken(HttpServletRequest request) {
        //We save in authToken, request header
        //of form: "Bearer token"
        String authToken = request.getHeader(tokenHeader);
        //We only take the token from the request
        final String token = authToken.substring(7);
        if (jwtTokenUtil.canTokenBeRefreshed(token)) {
            String refreshedToken = jwtTokenUtil.refreshToken(token);
            return ResponseEntity.ok(new JwtTokenResponse(refreshedToken));
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }
}