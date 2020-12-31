package com.airquality.commons.airqualitypersistanceservice.controller;

import com.airquality.commons.airqualitypersistanceservice.service.EmailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contact")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactController {

    @Autowired
    EmailServiceImpl emailService;

    @PutMapping("/sendMail/{from}/{subject}/{text}")
    public void sendMail(@PathVariable String from,@PathVariable String subject,@PathVariable String text) throws Exception {
        emailService.sendMail(from, subject, text);
    }

}