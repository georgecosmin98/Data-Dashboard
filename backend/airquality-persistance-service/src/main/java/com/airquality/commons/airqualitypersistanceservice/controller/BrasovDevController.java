package com.airquality.commons.airqualitypersistanceservice.controller;

import com.airquality.commons.airqualitypersistanceservice.model.BrasovDevDto;
import com.airquality.commons.airqualitypersistanceservice.repository.BrasovDevRepository;
import com.airquality.commons.airqualitypersistanceservice.service.BrasovDevService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/brasovdev")
public class BrasovDevController {

    @Autowired
    private BrasovDevService brasovDevService;

    @GetMapping("/hello")
    public String helloWorld(){
        return "Hello world from brasov dev controller";
    }

    @GetMapping("/{sensorName}")
    public List<BrasovDevDto> findBySensorName(@PathVariable String sensorName){
        return brasovDevService.findBySensor(sensorName);
    }
}
