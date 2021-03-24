package com.airquality.commons.airqualitypersistanceservice.controller;

import com.airquality.commons.airqualitypersistanceservice.model.UserLocationDto;
import com.airquality.commons.airqualitypersistanceservice.repository.UserLocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usersLocations")
@CrossOrigin("*")
public class UserLocationController {

    @Autowired
    UserLocationRepository userLocationRepository;

    @PostMapping("/save")
    public void saveUserLocation(@RequestBody UserLocationDto userLocationDto){
        userLocationRepository.save(userLocationDto);
    }
}
