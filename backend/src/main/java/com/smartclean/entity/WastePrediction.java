package com.smartclean.entity;

import com.smartclean.entity.enums.RiskLevel;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "waste_predictions", indexes = {
    @Index(name = "idx_prediction_bin_id", columnList = "bin_id")
})
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WastePrediction extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "bin_id", nullable = false)
    private Bin bin;

    @Column(nullable = false)
    private Double currentFill;

    @Column(nullable = false)
    private Double growthRatePerHour;

    private Double estimatedOverflowHours;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private RiskLevel riskLevel;

    @Column(length = 50)
    private String predictionMethod;

    private Double predictionConfidence;

    @Column(nullable = false)
    private Instant predictedAt;
}
