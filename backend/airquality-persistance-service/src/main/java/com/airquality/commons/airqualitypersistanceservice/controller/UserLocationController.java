package com.airquality.commons.airqualitypersistanceservice.controller;

import com.airquality.commons.airqualitypersistanceservice.model.UserLocationDto;
import com.airquality.commons.airqualitypersistanceservice.service.UserLocationServiceImpl;
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
    UserLocationServiceImpl userLocationService;

    @PostMapping("/save")
    public void saveUserLocation(@RequestBody UserLocationDto userLocationDto) {
        if(!userLocationDto.getUsername().isEmpty())
            userLocationService.save(userLocationDto);
    }

    @GetMapping("/findAllAfter/{date}")
    public List<UserLocationDto> findByTimeInterval(@PathVariable("date") @DateTimeFormat(pattern = "yyyy-MM-dd, HH:mm") Date data) {
        return userLocationService.findUserLocationDtoByTimestampAfter(data);
    }

    @GetMapping("/findByDate/{date}/{username}")
    public List<UserLocationDto> findByTimeIntervalAndUsername(@PathVariable("date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date data,
                                                               @PathVariable String username) {
        return userLocationService.findDailyUserLocationDtoByTimestampAfterAndUsername(data,username);
    }

    @GetMapping("/findBetween/{fromDate}/to/{toDate}")
    public List<UserLocationDto> findBetweenTimeInterval(@PathVariable("fromDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fromDate,
                                                         @PathVariable("toDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date toDate) {
        return userLocationService.findUserLocationDtoByTimestampBetween(fromDate, toDate);
    }
}
