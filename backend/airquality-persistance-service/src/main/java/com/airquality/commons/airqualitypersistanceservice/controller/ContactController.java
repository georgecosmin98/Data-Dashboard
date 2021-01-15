package com.airquality.commons.airqualitypersistanceservice.controller;

import com.airquality.commons.airqualitypersistanceservice.service.EmailServiceImpl;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contact")
@CrossOrigin("*")
@Log4j2
public class ContactController {

    @Autowired
    EmailServiceImpl emailService;

    @GetMapping("/hello")
    public String helloWorld(){
        return "Hello World!";
    }

    @PutMapping("/sendMail/{from}/{subject}/{text}")
    public HttpStatus sendMail(@PathVariable String from,@PathVariable String subject,@PathVariable String text) throws Exception {

        return emailService.sendMail(from, subject, text);

    }

}