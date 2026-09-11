from PIL import Image, ImageOps
import numpy as np

def preprocess_waste_image(image: Image.Image, target_size=224) -> np.ndarray:
    # EXIF transpose
    image = ImageOps.exif_transpose(image)
    
    # RGB conversion
    if image.mode != "RGB":
        image = image.convert("RGB")
        
    # Letterbox resize (maintain aspect ratio, pad with gray 114)
    w, h = image.size
    scale = min(target_size / w, target_size / h)
    nw, nh = int(w * scale), int(h * scale)
    image = image.resize((nw, nh), Image.Resampling.LANCZOS)
    
    new_image = Image.new("RGB", (target_size, target_size), (114, 114, 114))
    new_image.paste(image, ((target_size - nw) // 2, (target_size - nh) // 2))
    
    # Convert to numpy array and normalize to [0,1] float32
    img_array = np.array(new_image, dtype=np.float32) / 255.0
    
    # NCHW format
    img_array = img_array.transpose((2, 0, 1))
    img_array = np.expand_dims(img_array, axis=0)
    
    return img_array
