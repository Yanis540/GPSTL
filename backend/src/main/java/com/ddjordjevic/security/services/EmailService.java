package com.ddjordjevic.security.services;

import com.ddjordjevic.security.config.RabbitMQConfig;
import com.ddjordjevic.security.dtos.user.UserDTO;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

//@Service
@RequiredArgsConstructor
@Slf4j
//@RabbitListener(queues = RabbitMQConfig.EMAIL_QUEUE)
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    private final TemplateEngine templateEngine;

    @RabbitHandler
    public void receiveMessage(UserDTO userDTO) {
        try {
            sendWelcomeEmail(userDTO);
        } catch (MessagingException e) {
            log.error(e.getMessage());
        }
    }

    private void sendWelcomeEmail(UserDTO userDTO) throws MessagingException {
        Context context = new Context();
        context.setVariable("name", userDTO.getFirstname() + " " + userDTO.getLastname());
        context.setVariable("email", fromEmail);
        String htmlContent = templateEngine.process("email-template", context);
        sendEmail(userDTO, "Welcome", htmlContent);
    }

    private void sendChangePasswordEmail(UserDTO userDTO) throws MessagingException {
        Context context = new Context();
        context.setVariable("name", userDTO.getFirstname() + " " + userDTO.getLastname());
        context.setVariable("email", fromEmail);
        String htmlContent = templateEngine.process("email-template", context);
        sendEmail(userDTO, "Password was changed", htmlContent);
    }

    private void sendEmail(UserDTO userDTO, String subject, String htmlContent) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(userDTO.getEmail());
        helper.setSubject(subject);
        helper.setText(htmlContent, true);
        helper.setFrom(fromEmail);
        mailSender.send(message);
        log.info("Email envoyé avec succès à {}", userDTO.getEmail());
    }
}
