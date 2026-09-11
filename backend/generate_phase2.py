import os

base_dir = "/home/kulayappa/.gemini/antigravity/scratch/smartclean/backend/src/main/java/com/smartclean"
dirs = ["dto", "service", "controller"]

for d in dirs:
    os.makedirs(os.path.join(base_dir, d), exist_ok=True)

files = {}

# ----------------- DTOs -----------------
files["dto/AuthDtos.java"] = """package com.smartclean.dto;
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
"""

files["dto/BinDtos.java"] = """package com.smartclean.dto;
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
"""

files["dto/WasteDtos.java"] = """package com.smartclean.dto;
import java.util.UUID;
import java.time.LocalDateTime;
public class WasteDtos {
    public record WasteEventResponse(UUID id, UUID binId, String category, Double weight, LocalDateTime timestamp) {}
    public record AiPredictionRequest(UUID binId) {}
    public record WastePredictionResponse(UUID id, UUID binId, LocalDateTime predictedOverflowTime, String riskLevel, Double confidence) {}
}
"""

files["dto/ComplaintDtos.java"] = """package com.smartclean.dto;
import java.util.UUID;
import java.time.LocalDateTime;
public class ComplaintDtos {
    public record CreateComplaintRequest(String description, Double latitude, Double longitude, String category, String imageUrl) {}
    public record UpdateComplaintRequest(String status, String resolutionNotes) {}
    public record ComplaintResponse(UUID id, UUID citizenId, String description, String category, String status, String priority, Double latitude, Double longitude, LocalDateTime createdAt, String resolutionNotes) {}
}
"""

files["dto/CollectionDtos.java"] = """package com.smartclean.dto;
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
"""

files["dto/WorkerDtos.java"] = """package com.smartclean.dto;
import java.util.UUID;
public class WorkerDtos {
    public record WorkerResponse(UUID id, String name, String phone, String status, Double latitude, Double longitude) {}
    public record WorkerStatsResponse(UUID workerId, Integer tasksCompleted, Double distanceTraveled, Double averageTimePerTask) {}
}
"""

files["dto/NotificationDtos.java"] = """package com.smartclean.dto;
import java.util.UUID;
import java.time.LocalDateTime;
public class NotificationDtos {
    public record NotificationResponse(UUID id, String title, String message, String type, boolean read, LocalDateTime createdAt) {}
}
"""

files["dto/AnalyticsDtos.java"] = """package com.smartclean.dto;
import java.util.List;
import java.time.LocalDate;
public class AnalyticsDtos {
    public record DashboardSummary(Integer totalBins, Integer criticalBins, Integer activeComplaints, Integer activeTasks) {}
    public record WasteTrend(LocalDate date, Double totalWeight) {}
    public record CategoryDistribution(String category, Double percentage) {}
    public record CollectionEfficiency(LocalDate date, Double efficiencyScore) {}
}
"""

files["dto/SimulatorDtos.java"] = """package com.smartclean.dto;
import java.util.UUID;
public class SimulatorDtos {
    public record SimulateFillLevelRequest(UUID binId, Double fillLevel) {}
    public record SimulateWasteEventRequest(UUID binId, String category, Double weight) {}
    public record SimulateComplaintRequest(Double latitude, Double longitude, String category) {}
    public record SimulateBatchRequest(UUID vehicleId, Double weight) {}
    public record SystemStateResponse(Integer totalSimulatedEvents, String message) {}
}
"""

# ----------------- Services -----------------

files["service/AuthService.java"] = """package com.smartclean.service;
import com.smartclean.dto.AuthDtos.*;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class AuthService {
    public AuthResponse login(LoginRequest request) { return null; }
    public AuthResponse register(RegisterRequest request) { return null; }
    public UserDto getCurrentUser() { return null; }
}
"""

files["service/BinService.java"] = """package com.smartclean.service;
import com.smartclean.dto.BinDtos.*;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class BinService {
    public BinResponse createBin(CreateBinRequest request) { return null; }
    public BinResponse updateBin(UUID id, UpdateBinRequest request) { return null; }
    public BinResponse getBin(UUID id) { return null; }
    public List<BinResponse> getAllBins() { return null; }
    public List<BinSensorReadingResponse> getReadings(UUID id) { return null; }
    public List<BinResponse> getCriticalBins() { return null; }
    public List<BinMapResponse> getBinsForMap() { return null; }
    public void processTelemetry(String payload) {}
}
"""

files["service/WasteEventService.java"] = """package com.smartclean.service;
import com.smartclean.dto.WasteDtos.*;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class WasteEventService {
    public WasteEventResponse recordEvent(WasteEventResponse request) { return null; }
    public List<WasteEventResponse> getEventsByBin(UUID binId) { return null; }
    public List<WasteEventResponse> getRecentEvents() { return null; }
}
"""

files["service/WastePredictionService.java"] = """package com.smartclean.service;
import com.smartclean.dto.WasteDtos.*;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class WastePredictionService {
    public WastePredictionResponse getPrediction(UUID binId) { return null; }
}
"""

files["service/ComplaintService.java"] = """package com.smartclean.service;
import com.smartclean.dto.ComplaintDtos.*;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class ComplaintService {
    public ComplaintResponse createComplaint(CreateComplaintRequest request) { return null; }
    public ComplaintResponse updateComplaint(UUID id, UpdateComplaintRequest request) { return null; }
    public ComplaintResponse getComplaint(UUID id) { return null; }
    public List<ComplaintResponse> getAllComplaints() { return null; }
    public List<ComplaintResponse> getUserComplaints(UUID userId) { return null; }
    public void assignComplaint(UUID id, UUID workerId) {}
    public void resolveComplaint(UUID id, String notes) {}
}
"""

files["service/CollectionService.java"] = """package com.smartclean.service;
import com.smartclean.dto.CollectionDtos.*;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class CollectionService {
    public TaskResponse createTask(CreateTaskRequest request) { return null; }
    public List<TaskResponse> getTasksByStatus(String status) { return null; }
    public void assignTask(UUID taskId, UUID workerId) {}
    public void startTask(UUID taskId) {}
    public void completeTask(UUID taskId) {}
    public String calculatePriority(Double fillLevel) { return "LOW"; }
}
"""

files["service/RouteService.java"] = """package com.smartclean.service;
import com.smartclean.dto.CollectionDtos.*;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class RouteService {
    public RouteResponse generateRoute(GenerateRouteRequest request) { return null; }
    public void startRoute(UUID routeId) {}
    public void completeRoute(UUID routeId) {}
}
"""

files["service/DisposalService.java"] = """package com.smartclean.service;
import com.smartclean.dto.CollectionDtos.*;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class DisposalService {
    public WasteBatchResponse createBatch(WasteBatchResponse request) { return null; }
    public void advanceBatchStage(UUID batchId) {}
    public List<DisposalRecordResponse> getDisposalRecords() { return null; }
}
"""

files["service/WorkerService.java"] = """package com.smartclean.service;
import com.smartclean.dto.WorkerDtos.*;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class WorkerService {
    public List<WorkerResponse> getWorkers() { return null; }
    public WorkerStatsResponse getWorkerStats(UUID workerId) { return null; }
    public void updateWorkerStatus(UUID workerId, String status) {}
}
"""

files["service/NotificationService.java"] = """package com.smartclean.service;
import com.smartclean.dto.NotificationDtos.*;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class NotificationService {
    public void sendNotification(UUID userId, String message) {}
    public List<NotificationResponse> getNotifications(UUID userId) { return null; }
    public void markAsRead(UUID id) {}
    public void markAllAsRead(UUID userId) {}
}
"""

files["service/AnalyticsService.java"] = """package com.smartclean.service;
import com.smartclean.dto.AnalyticsDtos.*;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AnalyticsService {
    public DashboardSummary getDashboardSummary() { return null; }
    public List<WasteTrend> getWasteTrends() { return null; }
    public List<CategoryDistribution> getCategoryDistribution() { return null; }
    public List<CollectionEfficiency> getCollectionEfficiency() { return null; }
}
"""

files["service/SimulatorService.java"] = """package com.smartclean.service;
import com.smartclean.dto.SimulatorDtos.*;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class SimulatorService {
    public SystemStateResponse simulateFillLevel(SimulateFillLevelRequest request) { return null; }
    public SystemStateResponse simulateWasteEvent(SimulateWasteEventRequest request) { return null; }
    public SystemStateResponse simulateComplaint(SimulateComplaintRequest request) { return null; }
    public SystemStateResponse simulateBatch(SimulateBatchRequest request) { return null; }
}
"""

files["service/MqttListenerService.java"] = """package com.smartclean.service;
import org.springframework.stereotype.Service;

@Service
public class MqttListenerService {
    public void handleMessage(String payload) {}
}
"""

files["service/DataSeederService.java"] = """package com.smartclean.service;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.ApplicationArguments;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("dev")
public class DataSeederService implements ApplicationRunner {
    @Override
    public void run(ApplicationArguments args) throws Exception {
        // Seed initial data
    }
}
"""

# ----------------- Controllers -----------------

files["controller/AuthController.java"] = """package com.smartclean.controller;
import com.smartclean.dto.AuthDtos.*;
import com.smartclean.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;
    public AuthController(AuthService authService) { this.authService = authService; }
    @PostMapping("/login") public AuthResponse login(@RequestBody LoginRequest request) { return authService.login(request); }
    @PostMapping("/register") public AuthResponse register(@RequestBody RegisterRequest request) { return authService.register(request); }
    @GetMapping("/me") public UserDto getCurrentUser() { return authService.getCurrentUser(); }
}
"""

files["controller/BinController.java"] = """package com.smartclean.controller;
import com.smartclean.dto.BinDtos.*;
import com.smartclean.service.BinService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/bins")
public class BinController {
    private final BinService binService;
    public BinController(BinService binService) { this.binService = binService; }
    @GetMapping public List<BinResponse> getAllBins() { return binService.getAllBins(); }
    @PostMapping public BinResponse createBin(@RequestBody CreateBinRequest request) { return binService.createBin(request); }
    @GetMapping("/{id}") public BinResponse getBin(@PathVariable UUID id) { return binService.getBin(id); }
    @PutMapping("/{id}") public BinResponse updateBin(@PathVariable UUID id, @RequestBody UpdateBinRequest request) { return binService.updateBin(id, request); }
    @GetMapping("/{id}/readings") public List<BinSensorReadingResponse> getReadings(@PathVariable UUID id) { return binService.getReadings(id); }
    @GetMapping("/critical") public List<BinResponse> getCriticalBins() { return binService.getCriticalBins(); }
    @GetMapping("/map") public List<BinMapResponse> getBinsForMap() { return binService.getBinsForMap(); }
}
"""

files["controller/WasteEventController.java"] = """package com.smartclean.controller;
import com.smartclean.dto.WasteDtos.*;
import com.smartclean.service.WasteEventService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/waste-events")
public class WasteEventController {
    private final WasteEventService wasteEventService;
    public WasteEventController(WasteEventService wasteEventService) { this.wasteEventService = wasteEventService; }
    @PostMapping public WasteEventResponse recordEvent(@RequestBody WasteEventResponse request) { return wasteEventService.recordEvent(request); }
    @GetMapping("/bin/{binId}") public List<WasteEventResponse> getEventsByBin(@PathVariable UUID binId) { return wasteEventService.getEventsByBin(binId); }
    @GetMapping("/recent") public List<WasteEventResponse> getRecentEvents() { return wasteEventService.getRecentEvents(); }
}
"""

files["controller/ComplaintController.java"] = """package com.smartclean.controller;
import com.smartclean.dto.ComplaintDtos.*;
import com.smartclean.service.ComplaintService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/complaints")
public class ComplaintController {
    private final ComplaintService complaintService;
    public ComplaintController(ComplaintService complaintService) { this.complaintService = complaintService; }
    @PostMapping public ComplaintResponse createComplaint(@RequestBody CreateComplaintRequest request) { return complaintService.createComplaint(request); }
    @GetMapping public List<ComplaintResponse> getAllComplaints() { return complaintService.getAllComplaints(); }
    @GetMapping("/{id}") public ComplaintResponse getComplaint(@PathVariable UUID id) { return complaintService.getComplaint(id); }
    @PutMapping("/{id}") public ComplaintResponse updateComplaint(@PathVariable UUID id, @RequestBody UpdateComplaintRequest request) { return complaintService.updateComplaint(id, request); }
    @GetMapping("/user/{userId}") public List<ComplaintResponse> getUserComplaints(@PathVariable UUID userId) { return complaintService.getUserComplaints(userId); }
}
"""

files["controller/CollectionController.java"] = """package com.smartclean.controller;
import com.smartclean.dto.CollectionDtos.*;
import com.smartclean.service.CollectionService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/collections")
public class CollectionController {
    private final CollectionService collectionService;
    public CollectionController(CollectionService collectionService) { this.collectionService = collectionService; }
    @PostMapping("/tasks") public TaskResponse createTask(@RequestBody CreateTaskRequest request) { return collectionService.createTask(request); }
    @GetMapping("/tasks") public List<TaskResponse> getTasksByStatus(@RequestParam String status) { return collectionService.getTasksByStatus(status); }
}
"""

files["controller/RouteController.java"] = """package com.smartclean.controller;
import com.smartclean.dto.CollectionDtos.*;
import com.smartclean.service.RouteService;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/routes")
public class RouteController {
    private final RouteService routeService;
    public RouteController(RouteService routeService) { this.routeService = routeService; }
    @PostMapping("/generate") public RouteResponse generateRoute(@RequestBody GenerateRouteRequest request) { return routeService.generateRoute(request); }
}
"""

files["controller/DisposalController.java"] = """package com.smartclean.controller;
import com.smartclean.dto.CollectionDtos.*;
import com.smartclean.service.DisposalService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/disposal")
public class DisposalController {
    private final DisposalService disposalService;
    public DisposalController(DisposalService disposalService) { this.disposalService = disposalService; }
    @PostMapping("/batches") public WasteBatchResponse createBatch(@RequestBody WasteBatchResponse request) { return disposalService.createBatch(request); }
    @GetMapping("/records") public List<DisposalRecordResponse> getDisposalRecords() { return disposalService.getDisposalRecords(); }
}
"""

files["controller/WorkerController.java"] = """package com.smartclean.controller;
import com.smartclean.dto.WorkerDtos.*;
import com.smartclean.service.WorkerService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/workers")
public class WorkerController {
    private final WorkerService workerService;
    public WorkerController(WorkerService workerService) { this.workerService = workerService; }
    @GetMapping public List<WorkerResponse> getWorkers() { return workerService.getWorkers(); }
    @GetMapping("/{id}/stats") public WorkerStatsResponse getWorkerStats(@PathVariable UUID id) { return workerService.getWorkerStats(id); }
}
"""

files["controller/NotificationController.java"] = """package com.smartclean.controller;
import com.smartclean.dto.NotificationDtos.*;
import com.smartclean.service.NotificationService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {
    private final NotificationService notificationService;
    public NotificationController(NotificationService notificationService) { this.notificationService = notificationService; }
    @GetMapping("/user/{userId}") public List<NotificationResponse> getNotifications(@PathVariable UUID userId) { return notificationService.getNotifications(userId); }
}
"""

files["controller/AnalyticsController.java"] = """package com.smartclean.controller;
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
"""

files["controller/SimulatorController.java"] = """package com.smartclean.controller;
import com.smartclean.dto.SimulatorDtos.*;
import com.smartclean.service.SimulatorService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/simulator")
public class SimulatorController {
    private final SimulatorService simulatorService;
    public SimulatorController(SimulatorService simulatorService) { this.simulatorService = simulatorService; }
    @PostMapping("/fill-level") public SystemStateResponse simulateFillLevel(@RequestBody SimulateFillLevelRequest request) { return simulatorService.simulateFillLevel(request); }
    @PostMapping("/waste-event") public SystemStateResponse simulateWasteEvent(@RequestBody SimulateWasteEventRequest request) { return simulatorService.simulateWasteEvent(request); }
    @PostMapping("/complaint") public SystemStateResponse simulateComplaint(@RequestBody SimulateComplaintRequest request) { return simulatorService.simulateComplaint(request); }
    @PostMapping("/batch") public SystemStateResponse simulateBatch(@RequestBody SimulateBatchRequest request) { return simulatorService.simulateBatch(request); }
}
"""

for filepath, content in files.items():
    with open(os.path.join(base_dir, filepath), "w") as f:
        f.write(content)

print(f"Generated {len(files)} files.")
