package com.gpstl.backend.services;

import com.gpstl.backend.exception.InvalidCredentialsException;
import com.gpstl.backend.exception.UserAlreadyExistsException;
import com.gpstl.backend.exception.UserCreationException;
import com.gpstl.backend.models.user.Recruiter;
import com.gpstl.backend.models.user.Role;
import com.gpstl.backend.models.user.Student;
import com.gpstl.backend.payloads.request.AuthenticationRequest;
import com.gpstl.backend.payloads.response.AuthenticationResponse;
import com.gpstl.backend.payloads.request.RegisterRequest;
import com.gpstl.backend.repositories.CompanyRepository;
import com.gpstl.backend.repositories.ReferentialRepository;
import com.gpstl.backend.repositories.RefreshTokenRepository;
import com.gpstl.backend.repositories.UserRepository;
import com.gpstl.backend.models.token.TokenType;
import com.gpstl.backend.models.user.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final ReferentialRepository referentialRepository;
    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenService refreshTokenService;
    private final RefreshTokenRepository refreshTokenRepository;

    public AuthenticationResponse register(RegisterRequest request) {
        Optional<User> userExists = userRepository.findByEmail(request.getEmail());

        if (userExists.isPresent()) {
            throw new UserAlreadyExistsException("User already exists");
        }

        try {

            User user = null;

            if(request.getRole().equals(Role.RECRUITER)) {
                Recruiter recruiter = new Recruiter();
                recruiter.setFirstname(request.getFirstname());
                recruiter.setLastname(request.getLastname());
                recruiter.setEmail(request.getEmail());
                recruiter.setPhoto(request.getPhoto());
                recruiter.setPassword(request.getPassword()); // Pas besoin d'encoder ici, le service s'en occupe
                recruiter.setBirthdate(request.getBirthDate());
                recruiter.setCompany(companyRepository.findById(request.getCompanyId()).orElseThrow());
                recruiter.setRole(Role.RECRUITER);
                user = userService.saveUser(recruiter);
            }

            if(request.getRole().equals(Role.STUDENT)) {
                Student student = new Student();
                student.setFirstname(request.getFirstname());
                student.setLastname(request.getLastname());
                student.setEmail(request.getEmail());
                student.setPassword(request.getPassword());
                student.setPhoto(request.getPhoto());
                student.setBirthdate(request.getBirthDate());
                student.setField(referentialRepository.findById(request.getFieldId()).orElseThrow());
                student.setGrade(referentialRepository.findById(request.getGradeId()).orElseThrow());
                student.setSkills(request.getSkillIds()
                        .stream()
                        .map(referentialRepository::findById)
                        .map(s -> s.orElseThrow(() -> new IllegalArgumentException("Skill not found")))
                        .toList());
                student.setRole(Role.STUDENT);
                user = userService.saveUser(student);
            }

            if(user == null){
                throw new UserCreationException("User not created");
            }

            String accessToken = jwtService.generateToken(user);
            var refreshToken = refreshTokenService.createRefreshToken(user.getId());

            return AuthenticationResponse.builder()
                    .accessToken(accessToken)
                    .email(user.getEmail())
                    .id(user.getId())
                    .firstName(user.getFirstname())
                    .lastName(user.getLastname())
                    .photo(user.getPhoto())
                    .refreshToken(refreshToken.getToken())
                    .role(user.getRole().name())
                    .tokenType(TokenType.BEARER.name())
                    .build();

        } catch (Exception e) {
            throw new UserCreationException("User not created");
        }
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
            throw new InvalidCredentialsException("Bad credentials");
        }

        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new UsernameNotFoundException("Not found"));

        revokeAllUserTokens(user);
        String accessToken = jwtService.generateToken(user);
        var refreshToken = refreshTokenService.createRefreshToken(user.getId());
        return AuthenticationResponse.builder()
                .accessToken(accessToken)
                .role(user.getRole().name())
                .email(user.getEmail())
                .id(user.getId())
                .firstName(user.getFirstname())
                .lastName(user.getLastname())
                .photo(user.getPhoto())
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
