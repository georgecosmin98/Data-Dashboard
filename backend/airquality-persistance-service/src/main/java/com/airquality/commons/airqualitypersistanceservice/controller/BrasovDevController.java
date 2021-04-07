package com.airquality.commons.airqualitypersistanceservice.controller;

import com.airquality.commons.airqualitypersistanceservice.model.BrasovDevDto;
import com.airquality.commons.airqualitypersistanceservice.repository.BrasovDevRepository;
import com.airquality.commons.airqualitypersistanceservice.service.BrasovDevServiceImpl;
import com.airquality.commons.airqualitypersistanceservice.service.UserLocationServiceImpl;
import com.airquality.commons.airqualitypersistanceservice.util.HaversinUtil;
import org.elasticsearch.search.aggregations.AggregationBuilder;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;

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

    @GetMapping("/unique/{date}")
    public void unique(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) throws IOException {
        brasovDevServiceImpl.pollutionDataBasedOnLocation(date);
    }

    @GetMapping("/{sensorName}/{firstDate}/{lastDate}")
    public List<BrasovDevDto> findBySensorNameAndTimestamp(@PathVariable String sensorName, @PathVariable("firstDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date firstDate, @PathVariable("lastDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date lastDate) {
        return brasovDevRepository.findBySensorAndTimestampIsBetweenOrderByTimestampDesc(sensorName,firstDate.getTime(),lastDate.getTime());
    }

    @GetMapping("/{date}/{sensor}/{latitude}/{longitude}")
    public List<BrasovDevDto> findByDateSensorAndCoordinates(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,
                                                             @PathVariable String sensor, @PathVariable double latitude, @PathVariable double longitude) throws IOException {
        return brasovDevServiceImpl.pollutionDataBasedOnAddressLocation(date, sensor, latitude,longitude);
    }
    @GetMapping("/test1/{lat}/{longitude}")
    public double distance(@PathVariable double lat, @PathVariable double longitude){
       return HaversinUtil.distanceCalculator(lat,longitude,45,25);
    }
}
