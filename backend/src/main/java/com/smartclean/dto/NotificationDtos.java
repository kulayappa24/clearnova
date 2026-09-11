package com.smartclean.dto;

import com.smartclean.entity.enums.NotificationType;
import java.time.Instant;
import java.util.UUID;

public class NotificationDtos {

    public record NotificationResponse(
        UUID id,
        UUID userId,
        NotificationType type,
        String title,
        String message,
        String entityType,
        UUID entityId,
        Boolean read,
        Instant readAt,
        Instant createdAt
    ) {}
}
