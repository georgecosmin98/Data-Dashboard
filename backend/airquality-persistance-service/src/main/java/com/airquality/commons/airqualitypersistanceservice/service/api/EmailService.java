package com.airquality.commons.airqualitypersistanceservice.service.api;

public interface EmailService {

    void sendMail(String to, String subject, String text);
}
