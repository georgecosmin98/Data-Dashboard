package com.airquality.commons.airqualitypersistanceservice.controller;

import com.airquality.commons.airqualitypersistanceservice.model.Ascr2Dto;
import com.airquality.commons.airqualitypersistanceservice.service.Ascr2Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ascr2")
public class Ascr2Controller {

    @Autowired
    private Ascr2Service ascr2Service;

    @GetMapping("{id}")
    public Ascr2Dto findById(@PathVariable String id) throws Exception{
        return ascr2Service.findById(id);
    }
}
