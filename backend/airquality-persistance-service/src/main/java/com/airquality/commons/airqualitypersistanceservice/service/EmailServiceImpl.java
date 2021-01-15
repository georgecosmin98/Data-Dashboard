package com.airquality.commons.airqualitypersistanceservice.service;

import com.airquality.commons.airqualitypersistanceservice.service.api.EmailService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Base64;

@Service
@Log4j2
public class EmailServiceImpl implements EmailService {

    @Value("${spring.mail.username}")
    private String mailTo;

    private SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public HttpStatus sendMail(String from, String subject, String message) {

        constructConfirmationMail(from);
        try {
            javaMailSender.send(simpleMailMessage);
        } catch (MailSendException ex) {
            log.error("Failed to send confirmation mail");
            return HttpStatus.BAD_REQUEST;
        }

        constructSimpleMailMessage(from, mailTo, subject, new String(Base64.getDecoder().decode(message)));
        try {
            javaMailSender.send(simpleMailMessage);
        } catch (MailSendException ex) {
            log.error("Failed to send mail");
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.OK;
    }

    @Override
    public void constructConfirmationMail(String to) {
        String subject = "Harta Poluare Brasov Confirmation Mail";
        String message = "Hello " + to + "\n We received succesfully your message"
                + "\n\n Thank you," + "\n Harta Poluare Brasov Team";

        constructSimpleMailMessage(mailTo, to, subject, message);
    }

    @Override
    public void constructSimpleMailMessage(String from, String mailTo, String subject, String message) {
        //It's not mandatory to provide the from address, but many SMTP
        //server would reject such messages
        simpleMailMessage.setFrom(from);
        simpleMailMessage.setReplyTo(from);
        simpleMailMessage.setTo(mailTo);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(message);
    }


}
