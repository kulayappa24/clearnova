package com.smartclean.service;
import com.smartclean.dto.AuthDtos.*;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class AuthService {
    public AuthResponse login(LoginRequest request) { return null; }
    public AuthResponse register(RegisterRequest request) { return null; }
    public UserDto getCurrentUser() { return null; }
}
