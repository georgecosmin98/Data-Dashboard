package com.airquality.commons.airqualitypersistanceservice.repository;

import com.airquality.commons.airqualitypersistanceservice.model.BrasovDevDto;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@EnableElasticsearchRepositories
public interface BrasovDevRepository extends ElasticsearchRepository<BrasovDevDto,String> {

    List<BrasovDevDto> findBrasovDevDtoBySensorAndLocationLatAndLocationLong(String sensor,double latitude, double longitude);
    List<BrasovDevDto> findByTimestampIsBetween(Long firstDate, Long lastDate);
    List<BrasovDevDto> findByTimestampBeforeAndLocationLatAndLocationLongOrderByTimestampDesc(Long firstDate,double latitude,double longitude);
    List<BrasovDevDto> findByTimestampBetweenAndSensorAndLocationLatAndLocationLong(Long firstDate,Long secondDate,String sensor,double latitude,double longitude);
    List<BrasovDevDto> findByTimestampBetweenAndSensorAndLocationLatAndLocationLongOrderByTimestampAsc(Long firstDate,Long secondDate,String sensor,double latitude,double longitude);
    Optional<BrasovDevDto> findById(String id);
    List<BrasovDevDto> findBrasovDevDtoByTimestampAfter(Date firstDate);
    List<BrasovDevDto> findBySensor(String sensorName);
    List<BrasovDevDto> findBySensorAndTimestampIsBetweenOrderByTimestampDesc(String name, Long firstDate, Long lastDate);
    List<BrasovDevDto> findAllByTimestampAfterAndSensor(Long from, String sensor);
    List<BrasovDevDto> findAllByTimestampAfterAndSensorAndLocationLatAndLocationLongOrderByTimestampAsc(Long from, String sensor,double latitude, double longitude);
}
