package com.smartclean.repository;

import com.smartclean.entity.WasteBatch;
import com.smartclean.entity.enums.BatchStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface WasteBatchRepository extends JpaRepository<WasteBatch, UUID> {
    Optional<WasteBatch> findByBatchCode(String batchCode);
    List<WasteBatch> findByStatus(BatchStatus status);
}
