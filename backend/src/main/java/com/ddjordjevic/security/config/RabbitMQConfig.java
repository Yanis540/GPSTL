package com.ddjordjevic.security.config;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.support.converter.SimpleMessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

//@Configuration
public class RabbitMQConfig {

    public static final String EMAIL_QUEUE = "email_queue";
    @Value("${spring.rabbitmq.host}")
    private String host;

    @Bean
    public CachingConnectionFactory connectionFactory() {
        CachingConnectionFactory factory = new CachingConnectionFactory(host);
        factory.setUsername("myuser");
        factory.setPassword("secret");
        factory.setPort(5672);
        return factory;
    }

    @Bean
    public SimpleMessageConverter converter() {
        SimpleMessageConverter converter = new SimpleMessageConverter();
        converter.setAllowedListPatterns(List.of("com.ddjordjevic.security.dtos.*", "com.ddjordjevic.security.models.user.*", "java.lang.Enum"));
        return converter;
    }

    @Bean
    public Queue emailQueue() {
        return new Queue(EMAIL_QUEUE, false);
    }
}
