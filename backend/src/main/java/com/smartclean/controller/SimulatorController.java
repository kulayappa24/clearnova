package com.smartclean.controller;
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
