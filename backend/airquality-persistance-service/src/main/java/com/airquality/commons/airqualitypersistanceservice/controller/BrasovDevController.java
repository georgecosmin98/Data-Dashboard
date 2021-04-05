package com.airquality.commons.airqualitypersistanceservice.controller;

import com.airquality.commons.airqualitypersistanceservice.model.BrasovDevDto;
import com.airquality.commons.airqualitypersistanceservice.repository.BrasovDevRepository;
import com.airquality.commons.airqualitypersistanceservice.service.BrasovDevServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/brasovdev")
@CrossOrigin("*")
public class BrasovDevController {

    @Autowired
    private BrasovDevServiceImpl brasovDevServiceImpl;

    @Autowired
    private BrasovDevRepository brasovDevRepository;

    @GetMapping("/hello")
    public String helloWorld() {
        return "Hello world from brasov dev controller";
    }

    @GetMapping("/{sensorName}")
    public List<BrasovDevDto> findBySensorName(@PathVariable String sensorName) {
        return brasovDevServiceImpl.findBySensor(sensorName);
    }

    @GetMapping("/findAllAfter/{first}")
    public List<BrasovDevDto> findAllAfterDate(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date first) {
        return brasovDevRepository.findAllByTimestampAfterAndSensorAndLocationLatAndLocationLongOrderByTimestampAsc(first.getTime(),"pm25",45.653509,25.56612);
    }


    @GetMapping("/{sensorName}/{firstDate}/{lastDate}")
    public List<BrasovDevDto> findBySensorNameAndTimestamp(@PathVariable String sensorName, @PathVariable("firstDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date firstDate, @PathVariable("lastDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date lastDate) {
        return brasovDevRepository.findBySensorAndTimestampIsBetweenOrderByTimestampDesc(sensorName,firstDate.getTime(),lastDate.getTime());
    }
}
