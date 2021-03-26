package com.airquality.commons.airqualitypersistanceservice.service;

import com.icegreen.greenmail.configuration.GreenMailConfiguration;
import com.icegreen.greenmail.util.GreenMail;
import com.icegreen.greenmail.util.GreenMailUtil;
import com.icegreen.greenmail.util.ServerSetupTest;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import java.io.IOException;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
public class EmailServiceImplTest {

    public static final String EMAIL_FROM_PARAM = GreenMailUtil.random();
    public static final String EMAIL_SUBJECT_PARAM = GreenMailUtil.random();
    public static final String EMAIL_MESSAGE_PARAM = GreenMailUtil.random();
    public static final String FRONTEND_URL_ADDRESS = GreenMailUtil.random();
    public static final String RESET_PASSWORD_TOKEN = GreenMailUtil.random();
    public static final String RESET_PASSWORD_MAIL_SUBJECT = "Harta Poluare Brasov Reset Password";

    private static GreenMail emailServer;

    @Autowired
    private EmailServiceImpl emailService;

    @Rule
    public MockitoRule rule = MockitoJUnit.rule();

    @Before
    public void setUp() {
        //Setup and start smtp test server
        emailServer = new GreenMail(ServerSetupTest.ALL);
        emailServer.withConfiguration(GreenMailConfiguration.aConfig().withDisabledAuthentication());
        emailServer.start();
    }

    @After
    public void stopEmailServer() {
        emailServer.stop();
    }

    @Test
    public void testSendMailMethod() throws MessagingException, IOException {
        //Call sendMail method
        emailService.sendMail(EMAIL_FROM_PARAM, EMAIL_SUBJECT_PARAM, EMAIL_MESSAGE_PARAM);

        //Wait for incoming email, if we receive 2 email (mail and confirmation mail)
        //we return true, else if we exceed timeout (max time in ms) and we dont receive
        //2 email, we return false
        assertTrue(emailServer.waitForIncomingEmail(1500, 2));

        MimeMessage[] messages = emailServer.getReceivedMessages();
        MimeMessage message = messages[0];

        //Verify if email was sent successfully
        assertEquals(message.getSubject(), EMAIL_SUBJECT_PARAM);
        assertEquals(message.getFrom()[0].toString(), EMAIL_FROM_PARAM);
        assertEquals(message.getContent(), EMAIL_MESSAGE_PARAM.concat("\r\n"));
    }

    @Test
    public void testSendForgotPasswordMailMethod() throws MessagingException {
        //Call sendRecoveryPasswordMail
        emailService.sendForgotPasswordMail(EMAIL_FROM_PARAM, RESET_PASSWORD_TOKEN, FRONTEND_URL_ADDRESS);

        //Wait for incoming email
        assertTrue(emailServer.waitForIncomingEmail(1500,1));

        MimeMessage[] messages = emailServer.getReceivedMessages();
        MimeMessage message = messages[0];

        //Verify if email was sent successfully
        assertEquals(message.getSubject(), RESET_PASSWORD_MAIL_SUBJECT);
        assertEquals(message.getAllRecipients()[0].toString(), EMAIL_FROM_PARAM);
    }

}
