from fastapi import APIRouter, UploadFile, File, Request, HTTPException
import asyncio
from app.schemas.prediction import PredictionResponse
from app.config import settings

router = APIRouter()

@router.post("/api/v1/predict", response_model=PredictionResponse)
async def predict_waste(request: Request, file: UploadFile = File(...)):
    # Validate MIME type
    if file.content_type not in settings.ALLOWED_MIME_TYPES:
        raise HTTPException(status_code=415, detail=f"Unsupported file type. Allowed: {settings.ALLOWED_MIME_TYPES}")
        
    file_content = await file.read()
    
    classifier = request.app.state.classifier
    logger = request.app.state.logger
    preprocessor = classifier.preprocessor
    
    # Validation happens in preprocessor, handles 413 and 422
    image = preprocessor.validate_image(file_content, file.content_type, settings.MAX_FILE_SIZE_MB)
    
    # Run inference in thread
    prediction = await asyncio.to_thread(classifier.predict, image)
    
    # Log prediction
    logger.log_prediction(prediction)
    
    return prediction
