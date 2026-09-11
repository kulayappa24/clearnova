package com.smartclean.repository;

import com.smartclean.entity.Worker;
import com.smartclean.entity.enums.WorkerStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface WorkerRepository extends JpaRepository<Worker, UUID> {
    Optional<Worker> findByEmployeeCode(String employeeCode);
    List<Worker> findByStatus(WorkerStatus status);
    Optional<Worker> findByUserId(UUID userId);
}
