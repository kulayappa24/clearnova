package com.smartclean.service;
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
