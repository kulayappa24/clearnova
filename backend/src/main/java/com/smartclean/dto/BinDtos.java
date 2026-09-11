package com.smartclean.dto;
import java.util.UUID;
import java.time.LocalDateTime;
import java.util.List;
public class BinDtos {
    public record CreateBinRequest(String locationName, Double latitude, Double longitude, Double capacity, String category) {}
    public record UpdateBinRequest(String status, Double fillLevel, Double batteryLevel) {}
    public record BinResponse(UUID id, String locationName, Double latitude, Double longitude, Double capacity, Double fillLevel, Double batteryLevel, String status, String connectivity) {}
    public record BinSensorReadingResponse(UUID id, UUID binId, Double fillLevel, Double batteryLevel, Double temperature, LocalDateTime timestamp) {}
    public record BinMapResponse(UUID id, String locationName, Double latitude, Double longitude, Double fillLevel, String status) {}
}
