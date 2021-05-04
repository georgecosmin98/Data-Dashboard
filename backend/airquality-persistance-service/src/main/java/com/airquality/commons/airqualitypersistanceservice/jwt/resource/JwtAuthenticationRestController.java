package com.airquality.commons.airqualitypersistanceservice.jwt.resource;

import com.airquality.commons.airqualitypersistanceservice.jwt.JwtTokenUtil;
import com.airquality.commons.airqualitypersistanceservice.model.UserDto;
import com.airquality.commons.airqualitypersistanceservice.service.UserServiceImpl;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@Log4j2
public class JwtAuthenticationRestController {

    @Value("${jwt.http.request.header}")
    private String tokenHeader;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserServiceImpl userService;

    //In this method we create authentication toekn
    @RequestMapping(value = "${jwt.get.token.uri}", method = RequestMethod.POST)
    public ResponseEntity createAuthenticationToken(@RequestBody JwtTokenRequest authenticationRequest) throws Exception {
        //Verify if requested user have correct credentials
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername()
                    , authenticationRequest.getPassword()));
        } catch (Exception e) {
            log.info("User with invalid credentials trying to login ", e);
            return ResponseEntity.notFound().build();
        }
        //Load user information from database
        Optional<UserDto> userDto = userService.findUserByUsername(authenticationRequest.getUsername());
        final String token = jwtTokenUtil.generateToken(userDto.get());
        return ResponseEntity.ok(new JwtTokenResponse(token));
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
            return ResponseEntity.notFound().build();
        }
    }
}