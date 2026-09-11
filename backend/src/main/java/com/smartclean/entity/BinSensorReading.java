package com.smartclean.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "bin_sensor_readings", indexes = {
    @Index(name = "idx_reading_bin_id", columnList = "bin_id"),
    @Index(name = "idx_reading_recorded_at", columnList = "recordedAt")
})
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BinSensorReading extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "bin_id", nullable = false)
    private Bin bin;

    private Double distanceCm;
    private Double fillLevel;
    private Double weightKg;
    private Double temperature;
    private Double batteryLevel;
    
    @Column(nullable = false)
    private boolean anomalyFlag = false;

    @Column(columnDefinition = "TEXT")
    private String rawData;

    @Column(nullable = false)
    private Instant recordedAt;
}
