import os
import time
import random
import numpy as np
from typing import Dict, Any
from PIL import Image
from scipy.stats import entropy
from app.models.preprocessor import ImagePreprocessor
from app.config import settings

class WasteClassifier:
    CATEGORIES = ['ORGANIC', 'PLASTIC', 'PAPER', 'METAL', 'GLASS', 'REJECT']
    COMPARTMENT_MAP = {
        'ORGANIC': 'WET', 
        'PLASTIC': 'DRY', 
        'PAPER': 'DRY', 
        'METAL': 'DRY', 
        'GLASS': 'DRY', 
        'REJECT': 'REJECT'
    }

    def __init__(self, config):
        self.config = config
        self.development_mode = True
        self.session = None
        self.preprocessor = ImagePreprocessor()
        
        # Try to load ONNX model
        if not self.config.DEV_MODE and os.path.exists(self.config.MODEL_PATH):
            try:
                import onnxruntime as ort
                self.session = ort.InferenceSession(self.config.MODEL_PATH, providers=['CPUExecutionProvider'])
                self.development_mode = False
            except Exception as e:
                print(f"Failed to load ONNX model: {e}")
                self.development_mode = True
        else:
            self.development_mode = True
            
        print(f"WasteClassifier initialized. Development Mode: {self.development_mode}")

    def warmup(self):
        # dummy inference to eliminate cold start
        if not self.development_mode and self.session is not None:
            dummy_input = np.zeros((1, 3, 224, 224), dtype=np.float32)
            input_name = self.session.get_inputs()[0].name
            self.session.run(None, {input_name: dummy_input})

    def predict(self, image: Image.Image) -> Dict[str, Any]:
        start_time = time.perf_counter()
        
        img_array = self.preprocessor.preprocess(image)
        
        if not self.development_mode and self.session is not None:
            input_name = self.session.get_inputs()[0].name
            raw_scores = self.session.run(None, {input_name: img_array})[0][0]
            # softmax
            exp_scores = np.exp(raw_scores - np.max(raw_scores))
            probs = exp_scores / exp_scores.sum()
        else:
            # Development mode random prediction
            # generate realistic-looking fake confidences
            probs = np.random.dirichlet(np.ones(len(self.CATEGORIES) - 1)) # exclude REJECT
            # padding for REJECT category
            probs = np.append(probs, 0.0) 
            probs = probs / np.sum(probs)
            # maybe sometimes simulate high confidence
            if random.random() > 0.5:
                idx = random.randint(0, len(self.CATEGORIES)-2)
                probs = np.zeros(len(self.CATEGORIES))
                probs[idx] = random.uniform(0.7, 0.95)
                remaining = 1.0 - probs[idx]
                rem_probs = np.random.dirichlet(np.ones(len(self.CATEGORIES) - 2)) * remaining
                curr_rem_idx = 0
                for i in range(len(self.CATEGORIES)-1):
                    if i != idx:
                        probs[i] = rem_probs[curr_rem_idx]
                        curr_rem_idx += 1
                        
        inference_time_ms = (time.perf_counter() - start_time) * 1000

        # Sort probabilities
        sorted_indices = np.argsort(probs)[::-1]
        top1_idx = sorted_indices[0]
        top2_idx = sorted_indices[1]
        
        top1_conf = float(probs[top1_idx])
        top2_conf = float(probs[top2_idx])
        
        top1_cat = self.CATEGORIES[top1_idx]
        
        # Apply three-tier rejection
        # 1. Normalized entropy
        prob_dist = probs[:len(self.CATEGORIES)-1] # exclude REJECT for entropy? Or include it.
        prob_dist = prob_dist[prob_dist > 0]
        norm_entropy = float(entropy(prob_dist) / np.log(len(prob_dist)))
        
        final_cat = top1_cat
        low_confidence = False
        
        if norm_entropy > self.config.MAX_ENTROPY:
            final_cat = 'REJECT'
            low_confidence = True
        elif top1_conf < self.config.CONFIDENCE_THRESHOLD:
            final_cat = 'REJECT'
            low_confidence = True
        elif (top1_conf - top2_conf) < self.config.MARGIN_THRESHOLD:
            final_cat = 'REJECT'
            low_confidence = True
            
        alternatives = []
        for i in range(1, min(3, len(self.CATEGORIES))):
            idx = sorted_indices[i]
            if probs[idx] > 0.01:
                alternatives.append({
                    "category": self.CATEGORIES[idx],
                    "confidence": float(probs[idx])
                })
                
        # Recommended compartment
        compartment = self.COMPARTMENT_MAP.get(final_cat, 'REJECT')
        
        return {
            "category": final_cat,
            "confidence": top1_conf if final_cat != 'REJECT' else top1_conf,
            "alternatives": alternatives,
            "recommended_compartment": compartment,
            "model_version": self.config.MODEL_VERSION,
            "inference_time_ms": inference_time_ms,
            "low_confidence": low_confidence,
            "development_mode": self.development_mode
        }
        
    def get_model_info(self) -> Dict[str, Any]:
        return {
            "model_version": self.config.MODEL_VERSION,
            "categories": self.CATEGORIES,
            "confidence_threshold": self.config.CONFIDENCE_THRESHOLD,
            "development_mode": self.development_mode,
            "loaded": self.session is not None
        }
