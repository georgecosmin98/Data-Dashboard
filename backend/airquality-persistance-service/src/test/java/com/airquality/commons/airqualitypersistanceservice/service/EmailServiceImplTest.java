package com.airquality.commons.airqualitypersistanceservice.service;

import com.icegreen.greenmail.configuration.GreenMailConfiguration;
import com.icegreen.greenmail.util.GreenMail;
import com.icegreen.greenmail.util.GreenMailUtil;
import com.icegreen.greenmail.util.ServerSetupTest;
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

    public static final String FROM = "from@test.com";
    public static final String SUBJECT = "subject";
    public static final String MESSAGE = GreenMailUtil.random();
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

    @Test
    public void testSendMailMethod() throws MessagingException, IOException {

        //Call sendMail method
        emailService.sendMail(FROM, SUBJECT, MESSAGE);

        //Wait for incoming email, if we receive 2 email (mail and confirmation mail)
        //we return true, else if we exceed timeout (max time in ms) and we dont receive
        //2 email, we return false
        assertTrue(emailServer.waitForIncomingEmail(1500, 2));

        MimeMessage[] messages = emailServer.getReceivedMessages();
        MimeMessage message = messages[0];

        //Verify if email was sent succesfully
        assertEquals(message.getSubject(), SUBJECT);
        assertEquals(message.getFrom()[0].toString(), FROM);
        assertEquals(message.getContent(), MESSAGE.concat("\r\n"));

    }

}
