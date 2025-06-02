
package com.benevol.dto.auth;

import com.benevol.dto.user.UserDto;

public class LoginResponseDto {
    
    private String token;
    private UserDto user;

    // Constructeurs
    public LoginResponseDto() {}

    // Getters et Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public UserDto getUser() { return user; }
    public void setUser(UserDto user) { this.user = user; }
}
