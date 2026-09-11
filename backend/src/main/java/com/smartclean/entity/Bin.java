package com.smartclean.entity;

import com.smartclean.entity.enums.BinStatus;
import com.smartclean.entity.enums.Connectivity;
import com.smartclean.entity.enums.WasteCategory;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "bins", indexes = {
    @Index(name = "idx_bin_code", columnList = "binCode", unique = true),
    @Index(name = "idx_bin_status", columnList = "status"),
    @Index(name = "idx_bin_zone", columnList = "zone")
})
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bin extends BaseEntity {

    @Column(nullable = false, unique = true, length = 50)
    private String binCode;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 255)
    private String locationDescription;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @Column(length = 50)
    private String zone;

    @Column(nullable = false)
    private Double emptyDistanceCm;

    @Column(nullable = false)
    private Double fullDistanceCm;

    @Column(nullable = false)
    private Double fillLevel = 0.0;

    @Column(nullable = false)
    private Double weightKg = 0.0;

    private Double temperature;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private BinStatus status = BinStatus.NORMAL;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Connectivity connectivity = Connectivity.OFFLINE;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private WasteCategory wasteCategory;

    @Column(nullable = false)
    private Double criticalityScore = 0.0;

    @Column(nullable = false)
    private boolean simulationMode = false;

    private Instant lastSeen;
    
    private Instant lastCollection;
}
