package com.airquality.commons.airqualitypersistanceservice.service.api;

public interface EmailService {

    void sendMail(String from, String subject, String message);
    void sendConfirmationMail(String to);
    void constructSimpleMailMessage(String from, String mailTo, String subject, String message);
}
