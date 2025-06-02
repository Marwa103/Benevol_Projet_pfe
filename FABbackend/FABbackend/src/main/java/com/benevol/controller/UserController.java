
package com.benevol.controller;

import com.benevol.dto.user.UserDto;
import com.benevol.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:8080")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserDto> getUserProfile(Authentication authentication) {
        String email = authentication.getName();
        UserDto userProfile = userService.getUserProfile(email);
        return ResponseEntity.ok(userProfile);
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser(Authentication authentication) {
        String email = authentication.getName();
        UserDto currentUser = userService.getUserProfile(email);
        return ResponseEntity.ok(currentUser);
    }
}
