package com.airquality.commons.airqualitypersistanceservice.service.api;

import org.springframework.http.HttpStatus;

public interface EmailService {

    HttpStatus sendMail(String from, String subject, String message);
    void constructConfirmationMail(String to);
    void constructSimpleMailMessage(String from, String mailTo, String subject, String message);
}
