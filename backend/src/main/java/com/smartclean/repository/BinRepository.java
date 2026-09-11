package com.smartclean.repository;

import com.smartclean.entity.Bin;
import com.smartclean.entity.enums.BinStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BinRepository extends JpaRepository<Bin, UUID> {
    Optional<Bin> findByBinCode(String binCode);
    List<Bin> findByStatus(BinStatus status);
    List<Bin> findByZone(String zone);
}
