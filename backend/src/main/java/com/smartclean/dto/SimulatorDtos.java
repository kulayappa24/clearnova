package com.smartclean.dto;

import com.smartclean.entity.enums.WasteCategory;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public class SimulatorDtos {

    public record SimulateFillLevelRequest(
        @NotNull(message = "Bin ID is required")
        UUID binId,
        Double fillLevel,
        Double weightKg,
        Double temperature
    ) {}

    public record SimulateWasteEventRequest(
        @NotNull(message = "Bin ID is required")
        UUID binId,
        WasteCategory category,
        Double confidence
    ) {}

    public record SimulateComplaintRequest(
        UUID binId,
        String category,
        String description
    ) {}

    public record SimulateBatchRequest(
        WasteCategory category,
        Double weightKg,
        UUID facilityId
    ) {}

    public record SystemStateResponse(
        Long totalBins,
        Long activeWorkers,
        Long pendingTasks,
        Long openComplaints,
        Double currentSystemLoad,
        String simulatorStatus
    ) {}
}
