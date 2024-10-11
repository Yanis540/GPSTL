package com.gpstl.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

import static com.gpstl.backend.models.user.Role.*;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;
    private final CustomAccessDeniedHandler accessDeniedHandler;
    private final Http401UnauthorizedEntryPoint unauthorizedEntryPoint;

    private static final Long MAX_AGE = 3600L;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint(unauthorizedEntryPoint)
                        .accessDeniedHandler(accessDeniedHandler))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("auth/**","/swagger-ui/**", "/v2/api-docs/**", "/v3/api-docs/**")
                        .permitAll()
                        .requestMatchers("user/**").hasAnyRole(STUDENT.name(), RECRUITER.name(), ADMIN.name())
                        .requestMatchers("offer/**").hasAnyRole(STUDENT.name(), RECRUITER.name(), ADMIN.name())
                        .requestMatchers("candidacy/**").hasAnyRole(STUDENT.name(), RECRUITER.name(), ADMIN.name())
                        .requestMatchers("company/**").hasAnyRole(RECRUITER.name(), ADMIN.name())
                        .requestMatchers("referential/**").hasRole(ADMIN.name())
                        .anyRequest()
                        .authenticated())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = getCorsConfiguration();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

    private static CorsConfiguration getCorsConfiguration() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://127.0.0.1:3000");
        config.addAllowedOrigin("http://localhost:3000");
        config.setAllowedHeaders(Arrays.asList(
                HttpHeaders.AUTHORIZATION,
                HttpHeaders.CONTENT_TYPE,
                HttpHeaders.ACCEPT,
                HttpHeaders.COOKIE));
        config.setAllowedMethods(Arrays.asList(
                HttpMethod.GET.name(),
                HttpMethod.POST.name(),
                HttpMethod.PUT.name(),
                HttpMethod.DELETE.name()));
        config.setMaxAge(MAX_AGE);
        config.setAllowCredentials(true);
        config.addExposedHeader(HttpHeaders.SET_COOKIE);
        return config;
    }
}
