package com.ddjordjevic.security.config;

import com.ddjordjevic.security.repositories.RefreshTokenRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Transactional
public class ScheduledTasks {

    private final RefreshTokenRepository refreshTokenRepository;

    @Scheduled(fixedRate = 300000)
    public void cleanToken() {
        refreshTokenRepository.deleteAllByRevoked(true);
    }
}
