package com.airquality.commons.airqualitypersistanceservice.service;

import com.airquality.commons.airqualitypersistanceservice.jwt.JwtTokenUtil;
import com.airquality.commons.airqualitypersistanceservice.model.UserDto;
import com.airquality.commons.airqualitypersistanceservice.repository.UserRepository;
import com.airquality.commons.airqualitypersistanceservice.service.api.UserService;
import io.jsonwebtoken.Clock;
import io.jsonwebtoken.impl.DefaultClock;
import lombok.extern.log4j.Log4j2;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Date;
import java.util.Optional;

@Service
@Log4j2
public class UserServiceImpl implements UserService {

    private static final String GOOGLE_API_URL = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=";
    public static final String FACEBOOK_URL = "https://graph.facebook.com/";
    private final Clock clock = DefaultClock.INSTANCE;
    private static final int expirationTimeInSeconds = 3600;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Value("${jwt.http.request.header}")
    private String tokenHeader;

    @Override
    public UserDto createUser(UserDto userDto) {
        return userRepository.save(userDto);
    }

    @Override
    public UserDto loadUserByUsername(String username) {
        Optional<UserDto> userDto = userRepository.findByUsername(username);

        if (!userDto.isPresent()) {
            log.info("User not found: " + username);
            throw new UsernameNotFoundException(String.format("User not found '%s'.", username));
        }

        return userDto.get();
    }

    @Override
    //Method findByUsername is similar with loadByUsername
    //but this return an Optional object instead of an UserDto object
    public Optional<UserDto> findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    //Find user by reset token
    public Optional<UserDto> findUserByResetToken(String resetToken) {
        Optional<UserDto> userDto = userRepository.findByResetToken(resetToken);
        if (!userDto.isPresent()) {
            log.info("Token not found: " + resetToken);
            throw new UsernameNotFoundException(String.format("Token not found '%s'.", resetToken));
        }
        return userDto;
    }

    @Override
    //Generate expiration date in unix epoch (seconds)
    public Date generateExpirationDateForToken() {
        return new Date(clock.now().getTime() + expirationTimeInSeconds * 1000);
    }

    @Override
    //Verify if reset token is expired
    public Boolean isResetTokenExpired(Date expirationDate) {
        return expirationDate.before(clock.now());
    }


    public String getUsernameFromRequestHeader(HttpServletRequest request) {
        String jwtToken = jwtTokenUtil.parseJWTTokenFromRequestHeader(request);
        String username = null;
        if (jwtToken != null) {
            username = jwtTokenUtil.getUsernameFromRequestTokenHeader(jwtToken);
        }
        return username;
    }

    public UserDto getUserDetailsFromProvider(String id,String provider, String token) throws ParseException {
        String API_URL;
        String responseFromAPI="";

        if(provider.equals("google"))
            API_URL=GOOGLE_API_URL;
        else
            API_URL= FACEBOOK_URL +id+"?fields=id,name,email&access_token=";

        //Try to send a request from backend to WhoIsXmlAPI
        //to verify if email address is valid
        try (java.util.Scanner s =
                     new java.util.Scanner(new java.net.URL(API_URL+token).openStream())) {
            while(s.hasNext())
            {
                responseFromAPI+=s.nextLine();
            }
        } catch (Exception ex) {
            log.error("Sending request from backend to OAUTH2 provider failed: ", ex);
            return null;
        }
        return parseUserDtoFromResponse(responseFromAPI);
    }

    private UserDto parseUserDtoFromResponse(String response) throws ParseException {
        UserDto userDto = new UserDto();
        JSONParser parse = new JSONParser();
        JSONObject jobj = (JSONObject) parse.parse(response);
        userDto.setUsername(jobj.get("email").toString());
        userDto.setName(jobj.get("name").toString());
        System.out.println(userDto);
        return userDto;
    }
}
