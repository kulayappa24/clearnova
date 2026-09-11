package com.smartclean.entity;

import com.smartclean.entity.enums.WorkerStatus;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "workers", indexes = {
    @Index(name = "idx_worker_code", columnList = "employeeCode", unique = true),
    @Index(name = "idx_worker_status", columnList = "status")
})
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Worker extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false, unique = true, length = 50)
    private String employeeCode;

    @Column(length = 50)
    private String zone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private WorkerStatus status = WorkerStatus.AVAILABLE;

    @Column(nullable = false)
    private int completedTasks = 0;

    @Column(nullable = false)
    private double avgResponseMinutes = 0.0;
}
