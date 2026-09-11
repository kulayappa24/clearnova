package com.smartclean.controller;
import com.smartclean.dto.AnalyticsDtos.*;
import com.smartclean.service.AnalyticsService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/analytics")
public class AnalyticsController {
    private final AnalyticsService analyticsService;
    public AnalyticsController(AnalyticsService analyticsService) { this.analyticsService = analyticsService; }
    @GetMapping("/summary") public DashboardSummary getDashboardSummary() { return analyticsService.getDashboardSummary(); }
    @GetMapping("/trends") public List<WasteTrend> getWasteTrends() { return analyticsService.getWasteTrends(); }
    @GetMapping("/distribution") public List<CategoryDistribution> getCategoryDistribution() { return analyticsService.getCategoryDistribution(); }
    @GetMapping("/efficiency") public List<CollectionEfficiency> getCollectionEfficiency() { return analyticsService.getCollectionEfficiency(); }
}
