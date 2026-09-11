package com.smartclean.dto;
import java.util.UUID;
import java.time.LocalDateTime;
public class WasteDtos {
    public record WasteEventResponse(UUID id, UUID binId, String category, Double weight, LocalDateTime timestamp) {}
    public record AiPredictionRequest(UUID binId) {}
    public record WastePredictionResponse(UUID id, UUID binId, LocalDateTime predictedOverflowTime, String riskLevel, Double confidence) {}
}
