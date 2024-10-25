package com.sportsperformance.batch2.dto;

public class JwtResponseDTO {
    private String token;

    public JwtResponseDTO(String token) {
        this.token = token;
    }

    // Getter

    public String getToken() {
        return token;
    }
}
