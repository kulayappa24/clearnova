package com.smartclean.controller;
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
