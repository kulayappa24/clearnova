package com.smartclean.dto;
import java.util.UUID;
import java.util.List;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
public class AuthDtos {
    public record LoginRequest(@NotBlank @Email String email, @NotBlank String password) {}
    public record RegisterRequest(@NotBlank String name, @NotBlank @Email String email, @NotBlank String password, String role) {}
    public record AuthResponse(String token, UserDto user) {}
    public record UserDto(UUID id, String name, String email, String role) {}
}
