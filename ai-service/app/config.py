from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    MODEL_PATH: str = 'trained_models/waste_classifier.onnx'
    CONFIDENCE_THRESHOLD: float = 0.60
    MARGIN_THRESHOLD: float = 0.15
    MAX_ENTROPY: float = 0.70
    MAX_FILE_SIZE_MB: int = 8
    ALLOWED_MIME_TYPES: List[str] = ['image/jpeg', 'image/png', 'image/webp']
    MODEL_VERSION: str = 'waste-classifier-v1'
    DEV_MODE: bool = True
    LOG_PREDICTIONS: bool = True
    HOST: str = '0.0.0.0'
    PORT: int = 8000
    
    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8')

settings = Settings()
