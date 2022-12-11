package com.airquality.commons.airqualitypersistanceservice.repository;

import com.airquality.commons.airqualitypersistanceservice.model.UserDto;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

import java.util.Optional;

@EnableElasticsearchRepositories
public interface UserRepository extends ElasticsearchRepository<UserDto, String> {

    Optional<UserDto> findByUsername(String username);

    Optional<UserDto> findByResetToken(String resetToken);
 }
