package com.airquality.commons.airqualitypersistanceservice.controller;

import com.airquality.commons.airqualitypersistanceservice.model.Ascr2Dto;
import com.airquality.commons.airqualitypersistanceservice.model.UserLocationDto;
import com.airquality.commons.airqualitypersistanceservice.repository.UserLocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/usersLocations")
@CrossOrigin("*")
public class UserLocationController {

    @Autowired
    UserLocationRepository userLocationRepository;

    @PostMapping("/save")
    public void saveUserLocation(@RequestBody UserLocationDto userLocationDto) {
        userLocationRepository.save(userLocationDto);
    }

    @GetMapping("/findAll/{date}")
    public List<UserLocationDto> findByTimeInterval(@PathVariable("date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date data) {
        return userLocationRepository.findUserLocationDtoByTimestampAfter(data.getTime());
    }

    @GetMapping("/findBetween/{fromDate}/to/{toDate}")
    public List<UserLocationDto> findBetweenTimeInterval(@PathVariable("fromDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fromDate,
                                                         @PathVariable("toDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date toDate) {
        return userLocationRepository.findUserLocationDtoByTimestampBetween(fromDate.getTime(),toDate.getTime());
    }
}
