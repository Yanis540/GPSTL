package com.gpstl.backend.services;

import com.gpstl.backend.models.user.Recruiter;
import com.gpstl.backend.models.user.Role;
import com.gpstl.backend.models.user.Student;
import com.gpstl.backend.payloads.request.AuthenticationRequest;
import com.gpstl.backend.payloads.response.AuthenticationResponse;
import com.gpstl.backend.payloads.request.RegisterRequest;
import com.gpstl.backend.repositories.RefreshTokenRepository;
import com.gpstl.backend.repositories.UserRepository;
import com.gpstl.backend.models.token.TokenType;
import com.gpstl.backend.models.user.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
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

    public AuthenticationResponse register(RegisterRequest request) {
        Optional<User> userExist = userRepository.findByEmail(request.getEmail());
        if (userExist.isPresent()) {
            return null;
        }

        if(request.getRegisterType().equals("recruiter")) {
            Recruiter recruiter = new Recruiter();
            recruiter.setFirstname(request.getFirstname());
            recruiter.setLastname(request.getLastname());
            recruiter.setEmail(request.getEmail());
            recruiter.setPhoto(request.getPhoto());
            recruiter.setPassword(passwordEncoder.encode(request.getPassword()));
            recruiter.setCompany(request.getCompany());
        }

        if(request.getRegisterType().equals("student")) {
            Student student = new Student();
            student.setFirstname(request.getFirstname());
            student.setLastname(request.getLastname());
            student.setEmail(request.getEmail());
            student.setPassword(passwordEncoder.encode(request.getPassword()));
            student.setSkills(request.getSkills());
            student.setGrades(request.getGrades());
            student.setField(request.getField());
        }

        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        user = userRepository.save(user);
        revokeAllUserTokens(user);
        String accessToken = jwtService.generateToken(user);
        var refreshToken = refreshTokenService.createRefreshToken(user.getId());

        var roles = user.getRole().getAuthorities()
                .stream()
                .map(SimpleGrantedAuthority::getAuthority)
                .toList();

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
