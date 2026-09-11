from collections import Counter

class PredictionLogger:
    def __init__(self):
        self.predictions = []
        self.max_history = 1000

    def log_prediction(self, prediction_dict: dict):
        self.predictions.append(prediction_dict)
        if len(self.predictions) > self.max_history:
            self.predictions = self.predictions[-self.max_history:]

    def get_statistics(self) -> dict:
        total = len(self.predictions)
        if total == 0:
            return {
                "total_predictions": 0,
                "category_distribution": {},
                "avg_confidence": 0.0,
                "low_confidence_percentage": 0.0
            }
            
        categories = Counter(p["category"] for p in self.predictions)
        avg_conf = sum(p["confidence"] for p in self.predictions) / total
        low_conf = sum(1 for p in self.predictions if p.get("low_confidence", False))
        
        return {
            "total_predictions": total,
            "category_distribution": dict(categories),
            "avg_confidence": avg_conf,
            "low_confidence_percentage": (low_conf / total) * 100 if total > 0 else 0.0
        }

    def get_recent_predictions(self, n=10) -> list:
        return self.predictions[-n:]
