package com.smartclean.dto;
import java.util.UUID;
import java.time.LocalDateTime;
public class ComplaintDtos {
    public record CreateComplaintRequest(String description, Double latitude, Double longitude, String category, String imageUrl) {}
    public record UpdateComplaintRequest(String status, String resolutionNotes) {}
    public record ComplaintResponse(UUID id, UUID citizenId, String description, String category, String status, String priority, Double latitude, Double longitude, LocalDateTime createdAt, String resolutionNotes) {}
}
