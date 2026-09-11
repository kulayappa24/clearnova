package com.smartclean.service;
import com.smartclean.dto.BinDtos.*;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class BinService {
    public BinResponse createBin(CreateBinRequest request) { return null; }
    public BinResponse updateBin(UUID id, UpdateBinRequest request) { return null; }
    public BinResponse getBin(UUID id) { return null; }
    public List<BinResponse> getAllBins() { return null; }
    public List<BinSensorReadingResponse> getReadings(UUID id) { return null; }
    public List<BinResponse> getCriticalBins() { return null; }
    public List<BinMapResponse> getBinsForMap() { return null; }
    public void processTelemetry(String payload) {}
}
