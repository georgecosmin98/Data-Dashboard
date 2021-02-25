package com.airquality.commons.airqualitypersistanceservice.jwt;

import com.airquality.commons.airqualitypersistanceservice.model.UserDto;
import com.airquality.commons.airqualitypersistanceservice.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class JwtInMemoryUserDetailsService implements UserDetailsService {
    @Resource
    private UserRepository applicationUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDto applicationUser = applicationUserRepository.findByUsername(username);

        if (applicationUser == null) {
            throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", username));
        }

        return new JwtUserDetails(applicationUser.getId(),applicationUser.getUsername(), applicationUser.getPassword(),applicationUser.getRole());
    }

}
