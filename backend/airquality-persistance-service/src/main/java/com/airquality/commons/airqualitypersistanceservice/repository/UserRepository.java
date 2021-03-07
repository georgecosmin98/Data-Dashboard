package com.airquality.commons.airqualitypersistanceservice.repository;

import com.airquality.commons.airqualitypersistanceservice.model.UserDto;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.Optional;

public interface UserRepository extends ElasticsearchRepository<UserDto, String> {


    Optional<UserDto> findByEmailEquals(String email);
    UserDto findByUsername(String username);
    Optional<UserDto> findByEmail(String email);
 }
