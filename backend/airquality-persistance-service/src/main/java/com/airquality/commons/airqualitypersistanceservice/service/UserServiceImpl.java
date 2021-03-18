package com.airquality.commons.airqualitypersistanceservice.service;

import com.airquality.commons.airqualitypersistanceservice.model.UserDto;
import com.airquality.commons.airqualitypersistanceservice.repository.UserRepository;
import com.airquality.commons.airqualitypersistanceservice.service.api.UserService;
import io.jsonwebtoken.Clock;
import io.jsonwebtoken.impl.DefaultClock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
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
            throw new UsernameNotFoundException(String.format("User not found '%s'.", username));
        }

        return new UserDto(userDto.get().getId(), userDto.get().getName(), userDto.get().getUsername(), userDto.get().getPassword(), userDto.get().getResetToken(), userDto.get().getExpirationDate());
    }

    @Override
    public UserDto loadUserByResetToken(String resetToken) {
        Optional<UserDto> userDto = userRepository.findByResetToken(resetToken);

        if (userDto == null) {
            throw new UsernameNotFoundException(String.format("Token not found '%s'.", resetToken));
        }
        return new UserDto(userDto.get().getId(), userDto.get().getName(), userDto.get().getUsername(), userDto.get().getPassword(), userDto.get().getResetToken(), userDto.get().getExpirationDate());
    }

    @Override
    public Optional<UserDto> findUserByUsername(String username) {
        Optional<UserDto> userDto = userRepository.findByUsername(username);
        return userDto;
    }

    @Override
    public Optional<UserDto> findUserByResetToken(String resetToken) {
        Optional<UserDto> userDto = userRepository.findByResetToken(resetToken);
        return userDto;
    }

    @Override
    public Date generateExpirationDateForToken(){
        return new Date(clock.now().getTime() + expirationTimeInSeconds * 1000);
    }

    @Override
    public Boolean isTokenExpired(Date expirationDate) {
        return expirationDate.before(clock.now());
    }
}
