package com.smartclean.entity;

import com.smartclean.entity.enums.RouteStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "collection_routes", indexes = {
    @Index(name = "idx_route_status", columnList = "status")
})
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CollectionRoute extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    @Column(nullable = false, length = 100)
    private String routeName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private RouteStatus status = RouteStatus.PLANNED;

    @Column(columnDefinition = "TEXT")
    private String binSequenceJson;

    private Double totalDistanceKm;
    private Integer estimatedTimeMinutes;
    private Double estimatedLoadKg;
    private Double vehicleCapacityKg;
    private Double capacityUtilization;

    @Column(nullable = false)
    private boolean usesRoadRouting = false;

    private Instant startedAt;
    private Instant completedAt;
}
