package com.airquality.commons.airqualitypersistanceservice.repository;

import com.airquality.commons.airqualitypersistanceservice.model.UserLocationDto;
import org.apache.catalina.User;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserLocationRepository extends ElasticsearchRepository<UserLocationDto, String> {

    List<UserLocationDto> findUserLocationDtoByTimestampAfter(Long timestamp);

    List<UserLocationDto> findUserLocationDtoByTimestampAfterOrderByTimestampAsc(Long timestamp);

    List<UserLocationDto> findUserLocationDtoByTimestampAfterAndUsername(Long timestamp, String username);
    List<UserLocationDto> findUserLocationDtoByTimestampBetween(Long fromTimestamp, Long toTimestamp);
    List<UserLocationDto> findUserLocationDtoByTimestampAfterOrderByLatitudeDesc(Long fromTimestamp);
    List<UserLocationDto> findUserLocationDtoByTimestampAfterOrderByLongitudeDesc(Long fromTimestamp);
    List<UserLocationDto> findUserLocationDtoByTimestampAfterOrderByLatitudeAsc(Long fromTimestamp);
    List<UserLocationDto> findUserLocationDtoByTimestampAfterOrderByLongitudeAsc(Long fromTimestamp);
}
