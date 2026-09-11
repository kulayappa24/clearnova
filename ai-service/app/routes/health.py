from fastapi import APIRouter, Request
from app.schemas.prediction import HealthResponse, ModelInfo, MetricsResponse

router = APIRouter()

@router.get("/api/v1/health", response_model=HealthResponse)
async def health_check(request: Request):
    classifier = request.app.state.classifier
    return HealthResponse(
        status="ok",
        model_loaded=classifier.session is not None,
        development_mode=classifier.development_mode,
        version=classifier.config.MODEL_VERSION
    )

@router.get("/api/v1/model-info", response_model=ModelInfo)
async def get_model_info(request: Request):
    classifier = request.app.state.classifier
    return classifier.get_model_info()

@router.get("/api/v1/metrics", response_model=MetricsResponse)
async def get_metrics(request: Request):
    logger = request.app.state.logger
    stats = logger.get_statistics()
    recent = logger.get_recent_predictions(10)
    
    return MetricsResponse(
        total_predictions=stats["total_predictions"],
        category_distribution=stats["category_distribution"],
        avg_confidence=stats["avg_confidence"],
        low_confidence_percentage=stats["low_confidence_percentage"],
        recent_predictions=recent
    )
