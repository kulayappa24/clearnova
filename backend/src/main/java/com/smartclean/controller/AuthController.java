package com.smartclean.controller;
import com.smartclean.dto.AuthDtos.*;
import com.smartclean.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;
    public AuthController(AuthService authService) { this.authService = authService; }
    @PostMapping("/login") public AuthResponse login(@RequestBody LoginRequest request) { return authService.login(request); }
    @PostMapping("/register") public AuthResponse register(@RequestBody RegisterRequest request) { return authService.register(request); }
    @GetMapping("/me") public UserDto getCurrentUser() { return authService.getCurrentUser(); }
}
