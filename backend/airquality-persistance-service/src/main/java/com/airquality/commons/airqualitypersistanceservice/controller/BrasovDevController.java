package com.airquality.commons.airqualitypersistanceservice.controller;

import com.airquality.commons.airqualitypersistanceservice.model.BrasovDevDto;
import com.airquality.commons.airqualitypersistanceservice.repository.BrasovDevRepository;
import com.airquality.commons.airqualitypersistanceservice.service.BrasovDevServiceImpl;
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

    @GetMapping("/findAllAfter/{first}/{latitude}/{longitude}")
    public List<BrasovDevDto> findAllAfterDate(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd, HH:mm") Date first,@PathVariable double latitude,@PathVariable double longitude) throws IOException {
        return brasovDevServiceImpl.pollutionDataBasedOnAddressLocationAndData(latitude, longitude, first);
    }

    @GetMapping("/unique/{date}")
    public void unique(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date, String sensor) throws IOException {
        brasovDevServiceImpl.pollutionDataBasedOnLocation(date, sensor);
    }

    @GetMapping("/{sensorName}/{firstDate}/{lastDate}")
    public List<BrasovDevDto> findBySensorNameAndTimestamp(@PathVariable String sensorName, @PathVariable("firstDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date firstDate, @PathVariable("lastDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date lastDate) {
        return brasovDevRepository.findBySensorAndTimestampIsBetweenOrderByTimestampDesc(sensorName, firstDate.getTime(), lastDate.getTime());
    }

    @GetMapping("/{date}/{sensor}/{latitude}/{longitude}")
    public List<BrasovDevDto> findByDateSensorAndCoordinates(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,
                                                             @PathVariable String sensor, @PathVariable double latitude, @PathVariable double longitude) throws IOException {
        return brasovDevServiceImpl.pollutionDataBasedOnAddressLocation(date, sensor, latitude, longitude);
    }

    @GetMapping("/test1")
    public Map<String, String> distance() throws IOException {
        return brasovDevServiceImpl.findUniqueSensorNameForALocation();
    }

    @GetMapping("/test1/{name}/{lat1}/{lat2}/{long1}/{long2}/{firstDate}")
    public List<BrasovDevDto> test(@PathVariable String name, @PathVariable double lat1, @PathVariable double lat2, @PathVariable double long1, @PathVariable double long2, @PathVariable("firstDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date firstDate) {
        return brasovDevRepository.findAllBySensorAndLocationLatBetweenAndLocationLongBetweenAndTimestampAfterOrderByTimestampAsc(name, lat1, lat2, long1, long2, firstDate.getTime());
    }
}
