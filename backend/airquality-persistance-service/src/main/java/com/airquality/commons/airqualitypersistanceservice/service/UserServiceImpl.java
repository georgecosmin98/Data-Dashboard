package com.airquality.commons.airqualitypersistanceservice.service;

import com.airquality.commons.airqualitypersistanceservice.model.UserDto;
import com.airquality.commons.airqualitypersistanceservice.repository.UserRepository;
import com.airquality.commons.airqualitypersistanceservice.service.api.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

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

        return new UserDto(userDto.get().getId(), userDto.get().getName(), userDto.get().getUsername(), userDto.get().getPassword(), userDto.get().getResetToken());
    }

    @Override
    public UserDto loadUserByResetToken(String resetToken) {
        Optional<UserDto> userDto = userRepository.findByResetToken(resetToken);

        if (userDto == null) {
            throw new UsernameNotFoundException(String.format("Token not found '%s'.", resetToken));
        }
        return new UserDto(userDto.get().getId(), userDto.get().getName(), userDto.get().getUsername(), userDto.get().getPassword(), userDto.get().getResetToken());
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
}
