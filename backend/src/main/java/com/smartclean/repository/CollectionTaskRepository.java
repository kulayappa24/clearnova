package com.smartclean.repository;

import com.smartclean.entity.CollectionTask;
import com.smartclean.entity.enums.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CollectionTaskRepository extends JpaRepository<CollectionTask, UUID> {
    List<CollectionTask> findByStatus(TaskStatus status);
    List<CollectionTask> findByWorkerIdAndStatus(UUID workerId, TaskStatus status);
    List<CollectionTask> findByBinId(UUID binId);
}
