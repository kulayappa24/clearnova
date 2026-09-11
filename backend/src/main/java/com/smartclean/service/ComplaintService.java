package com.smartclean.service;
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
