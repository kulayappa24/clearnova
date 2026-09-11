from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class AlternativePrediction(BaseModel):
    category: str
    confidence: float

class PredictionResponse(BaseModel):
    category: str
    confidence: float
    alternatives: List[AlternativePrediction]
    recommended_compartment: str
    model_version: str
    inference_time_ms: float
    image_id: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    low_confidence: bool
    development_mode: bool

class ModelInfo(BaseModel):
    model_version: str
    categories: List[str]
    confidence_threshold: float
    development_mode: bool
    loaded: bool

class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    development_mode: bool
    version: str

class MetricsResponse(BaseModel):
    total_predictions: int
    category_distribution: dict
    avg_confidence: float
    low_confidence_percentage: float
    recent_predictions: list
