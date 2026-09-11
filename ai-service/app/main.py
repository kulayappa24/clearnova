from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uuid

from app.config import settings
from app.models.classifier import WasteClassifier
from app.evaluation.metrics import PredictionLogger
from app.routes import predict, health

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load model
    classifier = WasteClassifier(settings)
    classifier.warmup()
    app.state.classifier = classifier
    
    # Create logger
    app.state.logger = PredictionLogger()
    
    yield
    # Cleanup if necessary

app = FastAPI(
    title="SmartClean AI Service",
    description="Waste Classification API for Intelligent Waste Management",
    version=settings.MODEL_VERSION,
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if settings.DEV_MODE else ["https://smartclean.local"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request ID middleware
@app.middleware("http")
async def add_request_id(request: Request, call_next):
    request_id = str(uuid.uuid4())
    response = await call_next(request)
    response.headers["X-Request-ID"] = request_id
    return response

# Include routers
app.include_router(predict.router)
app.include_router(health.router)

@app.get("/")
async def root():
    return {
        "service": "SmartClean AI Service",
        "version": settings.MODEL_VERSION,
        "docs_url": "/docs",
        "development_mode": settings.DEV_MODE
    }
