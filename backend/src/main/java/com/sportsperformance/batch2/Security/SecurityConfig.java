package com.sportsperformance.batch2.Security;

import com.sportsperformance.batch2.filter.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {


    private final JwtRequestFilter jwtRequestFilter; // Injected via constructor

    public SecurityConfig(JwtRequestFilter jwtRequestFilter) {
        this.jwtRequestFilter = jwtRequestFilter; // Constructor injection
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // Configure HTTP security
        http
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/admin/**").hasAuthority("ADMIN")
                        .requestMatchers("/coach/**").hasAuthority("COACH")
                        .requestMatchers("/athlete/**").hasAuthority("ATHLETE")
                        .requestMatchers("/api/authenticate").permitAll()
                        .requestMatchers("/api/register").permitAll()
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Stateless session management
                );

        // Disabling CSRF protection if it's a stateless API
        http.csrf(AbstractHttpConfigurer::disable);

        // Adding JWT filter
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build(); // Build the SecurityFilterChain
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Password encoder bean
    }
}


