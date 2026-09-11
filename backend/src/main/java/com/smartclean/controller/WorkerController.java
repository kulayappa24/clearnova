package com.smartclean.controller;
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
