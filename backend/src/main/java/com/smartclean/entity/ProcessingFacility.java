package com.smartclean.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "processing_facilities")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProcessingFacility extends BaseEntity {

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 50)
    private String type;

    @Column(nullable = false, length = 255)
    private String address;

    private Double latitude;
    private Double longitude;

    @Column(columnDefinition = "TEXT")
    private String capabilitiesJson;

    @Column(nullable = false)
    private boolean active = true;
}
