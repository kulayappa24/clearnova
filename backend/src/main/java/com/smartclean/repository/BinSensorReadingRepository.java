package com.smartclean.repository;

import com.smartclean.entity.BinSensorReading;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BinSensorReadingRepository extends JpaRepository<BinSensorReading, UUID> {
    List<BinSensorReading> findByBinIdOrderByRecordedAtDesc(UUID binId);
}
