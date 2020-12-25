package com.airquality.commons.airqualitypersistanceservice.controller;

import com.airquality.commons.airqualitypersistanceservice.model.Ascr2Dto;
import com.airquality.commons.airqualitypersistanceservice.repository.Ascr2Repository;
import com.airquality.commons.airqualitypersistanceservice.service.Ascr2Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ascr2")
public class Ascr2Controller {

    @Autowired
    private Ascr2Service ascr2Service;

    @Autowired
    private Ascr2Repository ascr2Repository;


    @GetMapping("{id}")
    public Optional<Ascr2Dto> findById1(@PathVariable String id) throws Exception{
        return ascr2Repository.findById(id);
    }

    @GetMapping("/humidity/{id}")
    public List<Ascr2Dto> findById2(@PathVariable float id) throws Exception{
        return ascr2Repository.findByHumidity(id);
    }

    @GetMapping("/findAll")
    public Iterable<Ascr2Dto> findAll() throws Exception{
        return ascr2Repository.findAll();
    }

    @GetMapping("/findAll/{date}")
    public Iterable<Ascr2Dto> findByTimeInterval(@PathVariable("date") @DateTimeFormat(pattern = "yyyy-MM-dd")Date data) throws Exception{
        return ascr2Repository.findByTimestampIsBetween(data,new Date(2020,12,3));
    }
}
