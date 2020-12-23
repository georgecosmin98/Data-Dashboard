package com.airquality.commons.airqualitypersistanceservice.repository;

import com.airquality.commons.airqualitypersistanceservice.model.Ascr2Dto;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface Ascr2Repository extends ElasticsearchRepository<Ascr2Dto,String> {

    List<Ascr2Dto> findByHumidity(float humidity);
}
