package com.smartclean.entity;

import com.smartclean.entity.enums.WasteCategory;
import com.smartclean.entity.enums.WasteCompartment;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "waste_events", indexes = {
    @Index(name = "idx_waste_event_bin_id", columnList = "bin_id"),
    @Index(name = "idx_waste_event_created_at", columnList = "createdAt")
})
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WasteEvent extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "bin_id", nullable = false)
    private Bin bin;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private WasteCategory category;

    @Column(nullable = false)
    private Double confidence;

    @Column(length = 50)
    private String modelVersion;

    private Long inferenceTimeMs;

    @Column(length = 500)
    private String imagePath;

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private WasteCompartment compartment;

    @Column(columnDefinition = "TEXT")
    private String alternativesJson;
}
