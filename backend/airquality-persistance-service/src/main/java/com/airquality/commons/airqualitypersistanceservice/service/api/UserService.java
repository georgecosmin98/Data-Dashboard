package com.airquality.commons.airqualitypersistanceservice.service.api;

import com.airquality.commons.airqualitypersistanceservice.model.UserDto;

import java.util.Date;
import java.util.Optional;

public interface UserService {

    UserDto createUser(UserDto userDto);

    UserDto loadUserByUsername(String username);

    Optional<UserDto> findUserByUsername(String username);

    Optional<UserDto> findUserByResetToken(String resetToken);

    Date generateExpirationDateForToken();

    Boolean isResetTokenExpired(Date expirationDate);
}
