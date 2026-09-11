package com.smartclean.repository;

import com.smartclean.entity.WasteEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface WasteEventRepository extends JpaRepository<WasteEvent, UUID> {
    List<WasteEvent> findByBinIdOrderByCreatedAtDesc(UUID binId);
}
