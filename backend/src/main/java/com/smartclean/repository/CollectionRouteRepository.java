package com.smartclean.repository;

import com.smartclean.entity.CollectionRoute;
import com.smartclean.entity.enums.RouteStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CollectionRouteRepository extends JpaRepository<CollectionRoute, UUID> {
    List<CollectionRoute> findByStatus(RouteStatus status);
}
