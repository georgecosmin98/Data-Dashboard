package com.airquality.commons.airqualitypersistanceservice.service;

import com.airquality.commons.airqualitypersistanceservice.model.BrasovDevDto;
import com.airquality.commons.airqualitypersistanceservice.repository.BrasovDevRepository;
import com.airquality.commons.airqualitypersistanceservice.service.api.BrasovDevService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrasovDevServiceImpl implements BrasovDevService {

    @Autowired
    BrasovDevRepository brasovDevRepository;

    @Override
    public List<BrasovDevDto> findBySensor(String sensorName) {
        return brasovDevRepository.findBySensor(sensorName);
    }

    @Override
    public List<BrasovDevDto> findByTimestampIsBetween(int firstDate, int lastDate) {
        return brasovDevRepository.findByTimestampIsBetween(firstDate, lastDate);
    }


}
