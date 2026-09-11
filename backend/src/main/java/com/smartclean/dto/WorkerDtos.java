package com.smartclean.dto;
import java.util.UUID;
public class WorkerDtos {
    public record WorkerResponse(UUID id, String name, String phone, String status, Double latitude, Double longitude) {}
    public record WorkerStatsResponse(UUID workerId, Integer tasksCompleted, Double distanceTraveled, Double averageTimePerTask) {}
}
