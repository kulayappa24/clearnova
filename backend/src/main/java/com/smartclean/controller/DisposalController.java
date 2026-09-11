package com.smartclean.controller;
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
