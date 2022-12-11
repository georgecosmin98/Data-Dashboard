package com.airquality.commons.airqualitypersistanceservice.service;

import com.airquality.commons.airqualitypersistanceservice.service.api.EmailService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class EmailServiceImpl implements EmailService {

    @Value("${spring.mail.username}")
    private String mailTo;
    @Value("${emailverification.apikey}")
    private String apiKey;

    private SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public void sendMail(String from, String subject, String message) {

        constructConfirmationMail(from);
        try {
            javaMailSender.send(simpleMailMessage);
        } catch (MailSendException ex) {
            log.error("Failed to send confirmation mail");
        }

        constructSimpleMailMessage(from, mailTo, subject, message);
        try {
            javaMailSender.send(simpleMailMessage);
        } catch (MailSendException ex) {
            log.error("Failed to send mail");
        }
    }

    @Override
    public void sendForgotPasswordMail(String to, String token, String url){
        constructForgotPasswordMail(to,token, url);
        try {
            javaMailSender.send(simpleMailMessage);
        } catch (MailSendException ex) {
            log.error("Failed to send forgot password mail");
        }
    }

    @Override
    public void constructConfirmationMail(String to) {
        String subject = "Harta Poluare Brasov Confirmation Mail";
        String message = "Hello " + to + "\n We received succesfully your message"
                + "\n\n Thank you," + "\n Harta Poluare Brasov Team";

        constructSimpleMailMessage(mailTo, to, subject, message);
    }

    @Override
    public void constructForgotPasswordMail(String to, String token, String url) {
        String subject = "Harta Poluare Brasov Reset Password";
        String message = "Hello " + to + "\n\nPlease visit the following link to enter your new password:\n\n"
                + url + "/resetPassword/" + token + "\n\nIf you need any assistance, please contact us!";
        constructSimpleMailMessage(mailTo,to,subject,message);
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

    @Override
    public boolean sendRequestForValidateEmailAddress(String emailAddress) {
        String API_URL =
                "https://emailverification.whoisxmlapi.com/api/v1";
        String url = API_URL + "?emailAddress=" + emailAddress
                + "&apiKey=" + apiKey;
        String responseFromAPI;

        //Try to send a request from backend to WhoIsXmlAPI
        //to verify if email address is valid
        try (java.util.Scanner s =
                     new java.util.Scanner(new java.net.URL(url).openStream())) {
            responseFromAPI = s.useDelimiter("\\A").next();
            System.out.println(responseFromAPI);
        } catch (Exception ex) {
            log.error("Sending request from backend to WhoIsXmlAPI failed: ", ex);
            return false;
        }
        return validateEmailAddress(responseFromAPI);
    }

    @Override
    public boolean validateEmailAddress(String responseFromAPI) {
        if (!validateEmailAddressParameter(responseFromAPI, "formatCheck"))
            return false;
        if (!validateEmailAddressParameter(responseFromAPI, "smtpCheck"))
            return false;
        return validateEmailAddressParameter(responseFromAPI, "dnsCheck");
    }

    @Override
    public boolean validateEmailAddressParameter(String responseFromAPI, String parameterCheck) {
        String response = responseFromAPI;
        int indexParameterCheck = response.indexOf(parameterCheck);
        int startIndexSubstring = indexParameterCheck + parameterCheck.length() + 3;
        int endIndexSubstring = indexParameterCheck + parameterCheck.length() + 7;
        return response.substring(startIndexSubstring, endIndexSubstring).equals("true");
    }

}
