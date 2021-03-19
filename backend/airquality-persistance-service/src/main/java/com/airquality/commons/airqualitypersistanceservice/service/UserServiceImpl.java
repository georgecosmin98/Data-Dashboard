package com.airquality.commons.airqualitypersistanceservice.service;

import com.airquality.commons.airqualitypersistanceservice.model.UserDto;
import com.airquality.commons.airqualitypersistanceservice.repository.UserRepository;
import com.airquality.commons.airqualitypersistanceservice.service.api.UserService;
import io.jsonwebtoken.Clock;
import io.jsonwebtoken.impl.DefaultClock;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
@Log4j2
public class UserServiceImpl implements UserService {

    private Clock clock = DefaultClock.INSTANCE;
    private static final int expirationTimeInSeconds = 3600;
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDto createUser(UserDto userDto) {
        return userRepository.save(userDto);
    }

    @Override
    public UserDto loadUserByUsername(String username) {
        Optional<UserDto> userDto = userRepository.findByUsername(username);

        if (userDto == null) {
            log.info("User not found: " + username);
            throw new UsernameNotFoundException(String.format("User not found '%s'.", username));
        }

        return userDto.get();
    }

    @Override
    //Method findByUsername is similar with loadByUsername
    //but this return an Optional object instead of an UserDto object
    public Optional<UserDto> findUserByUsername(String username) {
        Optional<UserDto> userDto = userRepository.findByUsername(username);
        return userDto;
    }

    @Override
    //Find user by reset token
    public Optional<UserDto> findUserByResetToken(String resetToken) {
        Optional<UserDto> userDto = userRepository.findByResetToken(resetToken);
        if (userDto == null) {
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
}
