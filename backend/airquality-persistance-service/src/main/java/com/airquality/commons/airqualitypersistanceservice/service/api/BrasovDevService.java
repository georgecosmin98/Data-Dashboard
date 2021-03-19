package com.airquality.commons.airqualitypersistanceservice.service.api;

import com.airquality.commons.airqualitypersistanceservice.model.BrasovDevDto;

import java.util.List;

public interface BrasovDevService {

    List<BrasovDevDto> findBySensor(String sensorName);

}
