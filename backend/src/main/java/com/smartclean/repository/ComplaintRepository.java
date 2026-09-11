package com.smartclean.repository;

import com.smartclean.entity.Complaint;
import com.smartclean.entity.enums.ComplaintStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, UUID> {
    List<Complaint> findByStatus(ComplaintStatus status);
    List<Complaint> findByAssignedWorkerId(UUID workerId);
}
