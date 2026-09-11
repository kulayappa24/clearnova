package com.smartclean.controller;
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
