package com.airquality.commons.airqualitypersistanceservice.repository;

import com.airquality.commons.airqualitypersistanceservice.model.UserLocationDto;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserLocationRepository extends ElasticsearchRepository<UserLocationDto, String> {

    List<UserLocationDto> findUserLocationDtoByTimestampAfter(Long timestamp);
    List<UserLocationDto> findUserLocationDtoByTimestampBetween(Long fromTimestamp, Long toTimestamp);
}
