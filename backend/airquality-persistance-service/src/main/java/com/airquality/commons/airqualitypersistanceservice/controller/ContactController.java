package com.airquality.commons.airqualitypersistanceservice.controller;

import com.airquality.commons.airqualitypersistanceservice.service.EmailServiceImpl;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;

@RestController
@RequestMapping("/contact")
@CrossOrigin("*")
@Log4j2
public class ContactController {

    @Autowired
    EmailServiceImpl emailService;
    
    @PutMapping("/sendMail/{from}/{subject}/{text}")
    public void sendMail(@PathVariable String from, @PathVariable String subject, @PathVariable String text) throws Exception {
        emailService.sendMail(from, subject, new String(Base64.getDecoder().decode(text)));
    }

    @PutMapping("/emailVerification/{email}")
    public HttpStatus emailVerification(@PathVariable String email) {
        if (emailService.sendRequestForValidateEmailAddress(email))
            return HttpStatus.OK;
        else
            return HttpStatus.METHOD_NOT_ALLOWED;
    }

}