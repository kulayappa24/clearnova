package com.smartclean.dto;

import com.smartclean.entity.enums.WasteCategory;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public class AnalyticsDtos {

    public record DashboardSummary(
        Long totalBins,
        Long onlineBins,
        Long criticalBins,
        Long pendingComplaints,
        Long collectionsDue,
        Double todaysWasteKg,
        Double recyclingRate,
        Double avgFillLevel,
        Map<String, Long> binsByStatus,
        Map<String, Long> complaintsByStatus
    ) {}

    public record WasteTrend(
        LocalDate date,
        Double organicKg,
        Double plasticKg,
        Double paperKg,
        Double metalKg,
        Double glassKg,
        Double rejectKg,
        Double totalKg
    ) {}

    public record CategoryDistribution(
        WasteCategory category,
        Long count,
        Double weightKg,
        Double percentage
    ) {}

    public record CollectionEfficiency(
        LocalDate date,
        Long completedTasks,
        Long pendingTasks,
        Double avgResponseMinutes
    ) {}
}
