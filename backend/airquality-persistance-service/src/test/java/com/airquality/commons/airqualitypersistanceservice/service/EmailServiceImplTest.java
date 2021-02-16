package com.airquality.commons.airqualitypersistanceservice.service;

import com.icegreen.greenmail.configuration.GreenMailConfiguration;
import com.icegreen.greenmail.util.GreenMail;
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

import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
public class EmailServiceImplTest {

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
        emailService.sendMail("from@test.com", "subject", "bWVzc2FnZQ");
        assertTrue(emailServer.waitForIncomingEmail(1500, 1));

        MimeMessage[] messages = emailServer.getReceivedMessages();
        MimeMessage message = messages[0];
        assertTrue(message.getSubject().equals("subject"));
        assertTrue(message.getFrom()[0].toString().equals("from@test.com"));
       // assertTrue(message.getContent().equals("message"));

    }

}
