package com.smartclean.dto;
import java.util.UUID;
import java.time.LocalDateTime;
import java.util.List;
public class CollectionDtos {
    public record CreateTaskRequest(UUID binId, String priority) {}
    public record TaskResponse(UUID id, UUID binId, UUID workerId, String status, String priority, LocalDateTime scheduledTime, LocalDateTime completedTime) {}
    public record RouteResponse(UUID id, UUID vehicleId, List<TaskResponse> tasks, String status, Double totalDistance, LocalDateTime estimatedCompletion) {}
    public record GenerateRouteRequest(UUID vehicleId) {}
    public record WasteBatchResponse(UUID id, UUID vehicleId, UUID facilityId, Double totalWeight, String status) {}
    public record DisposalRecordResponse(UUID id, UUID batchId, Double processedWeight, String processingMethod, LocalDateTime timestamp) {}
}
