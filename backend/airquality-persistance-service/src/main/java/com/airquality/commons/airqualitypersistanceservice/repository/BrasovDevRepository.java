package com.airquality.commons.airqualitypersistanceservice.repository;

import com.airquality.commons.airqualitypersistanceservice.model.BrasovDevDto;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface BrasovDevRepository extends ElasticsearchRepository<BrasovDevDto,String> {
}
