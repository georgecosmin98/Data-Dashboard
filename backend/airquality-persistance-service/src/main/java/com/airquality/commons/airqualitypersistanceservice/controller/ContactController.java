package com.airquality.commons.airqualitypersistanceservice.controller;

import com.airquality.commons.airqualitypersistanceservice.service.EmailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contact")
@CrossOrigin("*")
public class ContactController {

    @Autowired
    EmailServiceImpl emailService;

    @GetMapping("/hello")
    public String helloWorld(){
        return "Hello World!";
    }

    @PutMapping("/sendMail/{from}/{subject}/{text}")
    @ResponseStatus(HttpStatus.OK)
    public void sendMail(@PathVariable String from,@PathVariable String subject,@PathVariable String text) throws Exception {
        emailService.sendMail(from, subject, text);
    }

}