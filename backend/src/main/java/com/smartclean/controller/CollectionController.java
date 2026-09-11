package com.smartclean.controller;
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
