package com.airquality.commons.airqualitypersistanceservice.service;

import com.airquality.commons.airqualitypersistanceservice.service.api.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Base64;

@Service
public class EmailServiceImpl implements EmailService {

    @Value("${spring.mail.username}")
    private String mailTo;

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public void sendMail(String from, String subject, String message) {

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        //It's not mandatory to provide the from address, but many SMTP
        //server would reject such messages
        simpleMailMessage.setFrom(from);
        simpleMailMessage.setTo(mailTo);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(new String(Base64.getDecoder().decode(message)));

        try {
            javaMailSender.send(simpleMailMessage);
        }catch (MailSendException ex){
            System.out.println("Failed to send mail");
        }
        sendConfirmationMail(from);
        }

    @Override
    public void sendConfirmationMail(String to) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        //It's not mandatory to provide the from address, but many SMTP
        //server would reject such messages
        simpleMailMessage.setFrom(mailTo);
        simpleMailMessage.setTo(to);
        simpleMailMessage.setSubject("Harta Poluare Brasov Confirmation Mail");
        simpleMailMessage.setText("Hello " + to + "\n We received succesfully your message"
                                    + "\n\n Thank you," +"\n Harta Poluare Brasov Team");

        try {
            javaMailSender.send(simpleMailMessage);
        }catch (MailSendException ex){
            System.out.println("Failed to send confirmation mail");
        }
    }


}
