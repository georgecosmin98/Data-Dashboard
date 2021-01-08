package com.airquality.commons.airqualitypersistanceservice.repository;

import com.airquality.commons.airqualitypersistanceservice.model.brasovDevDto;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface brasovDevRepository extends ElasticsearchRepository<brasovDevDto,String> {
}
