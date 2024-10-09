package com.ddjordjevic.security.services;

import com.ddjordjevic.security.config.RabbitMQConfig;
import com.ddjordjevic.security.mappers.user.UserMapper;
import com.ddjordjevic.security.payloads.request.AuthenticationRequest;
import com.ddjordjevic.security.payloads.response.AuthenticationResponse;
import com.ddjordjevic.security.payloads.request.RegisterRequest;
import com.ddjordjevic.security.repositories.RefreshTokenRepository;
import com.ddjordjevic.security.repositories.UserRepository;
import com.ddjordjevic.security.models.token.TokenType;
import com.ddjordjevic.security.models.user.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenService refreshTokenService;
    private final RefreshTokenRepository refreshTokenRepository;
    //private final RabbitTemplate rabbitTemplate;

    public AuthenticationResponse register(RegisterRequest request) {
        Optional<User> userExist = userRepository.findByEmail(request.getEmail());
        if (userExist.isPresent()) {
            return null;
        }
        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();

        user = userRepository.save(user);
        revokeAllUserTokens(user);
        String accessToken = jwtService.generateToken(user);
        var refreshToken = refreshTokenService.createRefreshToken(user.getId());

        var roles = user.getRole().getAuthorities()
                .stream()
                .map(SimpleGrantedAuthority::getAuthority)
                .toList();

        //rabbitTemplate.convertAndSend(RabbitMQConfig.EMAIL_QUEUE, UserMapper.toDTO(user));

        return AuthenticationResponse.builder()
                .accessToken(accessToken)
                .email(user.getEmail())
                .id(user.getId())
                .refreshToken(refreshToken.getToken())
                .roles(roles)
                .tokenType(TokenType.BEARER.name())
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (AuthenticationException e) {
            return null;
        }
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        var roles = user.getRole().getAuthorities()
                .stream()
                .map(SimpleGrantedAuthority::getAuthority)
                .toList();

        revokeAllUserTokens(user);
        String accessToken = jwtService.generateToken(user);
        var refreshToken = refreshTokenService.createRefreshToken(user.getId());
        return AuthenticationResponse.builder()
                .accessToken(accessToken)
                .roles(roles)
                .email(user.getEmail())
                .id(user.getId())
                .refreshToken(refreshToken.getToken())
                .tokenType( TokenType.BEARER.name())
                .build();
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = refreshTokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> token.setRevoked(true));
        refreshTokenRepository.saveAll(validUserTokens);
    }
}
