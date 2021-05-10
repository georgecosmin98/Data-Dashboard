package com.airquality.commons.airqualitypersistanceservice.repository;

import com.airquality.commons.airqualitypersistanceservice.model.BrasovDevDto;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@EnableElasticsearchRepositories
public interface BrasovDevRepository extends ElasticsearchRepository<BrasovDevDto,String> {

    List<BrasovDevDto> findByTimestampBetweenAndSensorAndLocationLatAndLocationLongOrderByTimestampAsc(Long firstDate,Long secondDate,String sensor,double latitude,double longitude);
    Optional<BrasovDevDto> findById(String id);
    List<BrasovDevDto> findBySensor(String sensorName);
    List<BrasovDevDto> findBySensorAndTimestampIsBetweenOrderByTimestampDesc(String name, Long firstDate, Long lastDate);
    List<BrasovDevDto> findAllByTimestampAfterAndSensorAndLocationLatAndLocationLongOrderByTimestampAsc(Long from, String sensor,double latitude, double longitude);
    List<BrasovDevDto> findAllBySensorAndLocationLatBetweenAndLocationLongBetweenAndTimestampAfterOrderByTimestampAsc(String name,double lat1,double lat2, double long1,double long2,Long date);
    List<BrasovDevDto> findAllByLocationLatAndLocationLongAndTimestampAfterOrderByTimestampDesc(double latitude,double longitude, Long timestamp);
    Stream<BrasovDevDto> findBySensorAndTimestampAfter(String sensor, Long date);
    Stream<BrasovDevDto> findByTimestampAfter(Long date);
    Stream<BrasovDevDto> findAllBySensorAndLocationLongBetweenAndLocationLatBetweenAndTimestampAfterOrderByTimestampAsc(String name,double lat1,double lat2, double long1,double long2,Long date);
    Stream<BrasovDevDto> findAllByLocationLongBetweenAndLocationLatBetweenAndTimestampAfterOrderByTimestampAsc(double lat1,double lat2, double long1,double long2,Long date);

}
