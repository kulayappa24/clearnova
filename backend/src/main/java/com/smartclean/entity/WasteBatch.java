package com.smartclean.entity;

import com.smartclean.entity.enums.BatchStatus;
import com.smartclean.entity.enums.WasteCategory;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "waste_batches", indexes = {
    @Index(name = "idx_batch_code", columnList = "batchCode", unique = true),
    @Index(name = "idx_batch_status", columnList = "status")
})
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WasteBatch extends BaseEntity {

    @Column(nullable = false, unique = true, length = 50)
    private String batchCode;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private WasteCategory category;

    private Double estimatedWeightKg;
    private Double actualWeightKg;

    @Column(columnDefinition = "TEXT")
    private String sourceBinsJson;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private BatchStatus status = BatchStatus.COLLECTED;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "worker_id")
    private Worker worker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "facility_id")
    private ProcessingFacility facility;

    @Column(columnDefinition = "TEXT")
    private String processingOutcome;

    private Instant collectedAt;
    private Instant transportedAt;
    private Instant receivedAt;
    private Instant processedAt;
}
