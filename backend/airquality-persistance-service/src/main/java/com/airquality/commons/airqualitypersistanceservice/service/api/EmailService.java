package com.airquality.commons.airqualitypersistanceservice.service.api;

public interface EmailService {

    void sendMail(String from, String subject, String message);
    void sendConfirmationMail(String to);
}
