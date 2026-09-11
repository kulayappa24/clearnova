package com.smartclean.controller;
import com.smartclean.dto.CollectionDtos.*;
import com.smartclean.service.RouteService;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/routes")
public class RouteController {
    private final RouteService routeService;
    public RouteController(RouteService routeService) { this.routeService = routeService; }
    @PostMapping("/generate") public RouteResponse generateRoute(@RequestBody GenerateRouteRequest request) { return routeService.generateRoute(request); }
}
