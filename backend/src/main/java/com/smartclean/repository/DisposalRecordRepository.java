package com.smartclean.repository;

import com.smartclean.entity.DisposalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DisposalRecordRepository extends JpaRepository<DisposalRecord, UUID> {
    List<DisposalRecord> findByBatchId(UUID batchId);
}
