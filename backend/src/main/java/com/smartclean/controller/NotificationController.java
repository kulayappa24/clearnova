package com.smartclean.controller;
import com.smartclean.dto.NotificationDtos.*;
import com.smartclean.service.NotificationService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {
    private final NotificationService notificationService;
    public NotificationController(NotificationService notificationService) { this.notificationService = notificationService; }
    @GetMapping("/user/{userId}") public List<NotificationResponse> getNotifications(@PathVariable UUID userId) { return notificationService.getNotifications(userId); }
}
