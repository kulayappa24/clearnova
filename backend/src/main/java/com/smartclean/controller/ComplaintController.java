package com.smartclean.controller;
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
