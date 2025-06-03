package com.benevol.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtConfig {

    @Value("${benevol.app.jwtSecret}")
    private String jwtSecret;

    @Value("${benevol.app.jwtExpirationMs}")
    private Long jwtExpirationMs;

    public String getJwtSecret() {
        return jwtSecret;
    }

    public Long getJwtExpirationMs() {
        return jwtExpirationMs;
    }
}
