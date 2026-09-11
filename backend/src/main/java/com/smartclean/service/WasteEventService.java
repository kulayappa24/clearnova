package com.smartclean.service;
import com.smartclean.dto.WasteDtos.*;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class WasteEventService {
    public WasteEventResponse recordEvent(WasteEventResponse request) { return null; }
    public List<WasteEventResponse> getEventsByBin(UUID binId) { return null; }
    public List<WasteEventResponse> getRecentEvents() { return null; }
}
