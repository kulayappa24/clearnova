import io
from fastapi import HTTPException
from PIL import Image, UnidentifiedImageError
from app.utils.image_utils import preprocess_waste_image

class ImagePreprocessor:
    def validate_image(self, file_content: bytes, content_type: str, max_size_mb: int) -> Image.Image:
        # File size validation happens in endpoint or middleware if possible, but here we can check bytes length
        if len(file_content) > max_size_mb * 1024 * 1024:
            raise HTTPException(status_code=413, detail=f"File too large. Max size is {max_size_mb}MB")
            
        try:
            image = Image.open(io.BytesIO(file_content))
            image.verify()  # Verify it's an image
            image = Image.open(io.BytesIO(file_content)) # Re-open after verify
            return image
        except (UnidentifiedImageError, IOError):
            raise HTTPException(status_code=422, detail="Invalid or corrupt image file")
            
    def preprocess(self, image: Image.Image):
        return preprocess_waste_image(image)
