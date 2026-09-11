package com.smartclean.service;
import com.smartclean.dto.NotificationDtos.*;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class NotificationService {
    public void sendNotification(UUID userId, String message) {}
    public List<NotificationResponse> getNotifications(UUID userId) { return null; }
    public void markAsRead(UUID id) {}
    public void markAllAsRead(UUID userId) {}
}
