package com.smartclean.service;
import com.smartclean.dto.CollectionDtos.*;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class DisposalService {
    public WasteBatchResponse createBatch(WasteBatchResponse request) { return null; }
    public void advanceBatchStage(UUID batchId) {}
    public List<DisposalRecordResponse> getDisposalRecords() { return null; }
}
