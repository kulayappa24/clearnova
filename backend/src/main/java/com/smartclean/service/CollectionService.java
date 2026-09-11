package com.smartclean.service;
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
