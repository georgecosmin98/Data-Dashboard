package com.airquality.commons.airqualitypersistanceservice.service;

import com.airquality.commons.airqualitypersistanceservice.model.BrasovDevDto;
import com.airquality.commons.airqualitypersistanceservice.repository.BrasovDevRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrasovDevService {

    @Autowired
    BrasovDevRepository brasovDevRepository;

    public List<BrasovDevDto> findBySensor(String sensorName) {
        return brasovDevRepository.findBySensor(sensorName);
    }

    public List<BrasovDevDto> findByTimestampIsBetween(int firstDate, int lastDate) {
        return brasovDevRepository.findByTimestampIsBetween(firstDate, lastDate);
    }
}
