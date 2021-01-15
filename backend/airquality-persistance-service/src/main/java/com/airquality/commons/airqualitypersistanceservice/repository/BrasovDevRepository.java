package com.airquality.commons.airqualitypersistanceservice.repository;

import com.airquality.commons.airqualitypersistanceservice.model.BrasovDevDto;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface BrasovDevRepository extends ElasticsearchRepository<BrasovDevDto,String> {

    List<BrasovDevDto> findByTimestampIsBetween(int firstDate, int lastDate);
    List<BrasovDevDto> findBySensor(String sensorName);
}
