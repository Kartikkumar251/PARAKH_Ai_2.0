import os
import sys
import tempfile
import cv2
import torch
import numpy as np
import onnx
from onnx2pytorch import ConvertModel

class DeepfakeDetector:
    def __init__(self):
        # We need to make sure python can import models from the repo
        base_dir = os.path.dirname(os.path.abspath(__file__))
        repo_dir = os.path.join(base_dir, "ml_model", "AI-Generated-Video-Detector")
        if repo_dir not in sys.path:
            sys.path.append(repo_dir)
            
        onnx_path = os.path.join(repo_dir, "checkpoints", "efficientnet.onnx")
        pth_path = os.path.join(repo_dir, "checkpoints", "model.pth")
        
        print("Loading ONNX model...")
        onnx_model = onnx.load(onnx_path)
        self.model = ConvertModel(onnx_model)
        
        print("Loading weights...")
        ckpt = torch.load(pth_path, map_location=torch.device('cpu'))
        self.model.load_state_dict(ckpt['rgb_encoder'], strict=True)
        self.model.eval()
        
    def _preprocess_image(self, img_np):
        face = img_np / 255.0
        face = cv2.resize(face, (256, 256))
        # Keep NHWC (256, 256, 3) because ONNX2PyTorch preserves original input shape
        face = face.astype(np.float32)
        face_pt = torch.unsqueeze(torch.tensor(face), dim=0)
        return face_pt
        
    def _predict_prob(self, img_np):
        face_pt = self._preprocess_image(img_np)
        with torch.no_grad():
            img_grads = self.model(face_pt)
            
        img_grads_np = np.squeeze(img_grads.cpu().numpy())
        
        # Output is already softmaxed probabilities: [p_class0, p_class1]
        # Assuming class 1 is AI-generated (fake)
        if getattr(img_grads_np, "size", 1) > 1:
            prob = float(img_grads_np[1])
        else:
            prob = float(img_grads_np)
            
        return prob
        
    def predict_image(self, file_bytes):
        np_arr = np.frombuffer(file_bytes, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        
        if img is None:
            return {"success": False, "error": "Invalid image format"}
            
        prob = self._predict_prob(img)
        
        prediction = "AI_GENERATED" if prob > 0.5 else "REAL"
        confidence = float(prob * 100 if prob > 0.5 else (1 - prob) * 100)
        
        return {
            "success": True,
            "prediction": prediction,
            "confidence": round(confidence, 2)
        }
        
    def predict_video(self, file_bytes):
        # Write bytes to temp file because cv2.VideoCapture needs a file
        fd, temp_path = tempfile.mkstemp(suffix=".mp4")
        with os.fdopen(fd, 'wb') as f:
            f.write(file_bytes)
            
        cap = cv2.VideoCapture(temp_path)
        probs = []
        
        # Read up to 5 frames evenly spaced
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        if total_frames <= 0:
            total_frames = 30 # fallback
            
        frame_indices = np.linspace(0, total_frames - 1, 5, dtype=int)
        
        for idx in frame_indices:
            cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
            ret, frame = cap.read()
            if ret and frame is not None:
                prob = self._predict_prob(frame)
                probs.append(prob)
                
        cap.release()
        os.remove(temp_path)
        
        if not probs:
            return {"success": False, "error": "Could not extract frames"}
            
        avg_prob = float(np.mean(probs))
        prediction = "AI_GENERATED" if avg_prob > 0.5 else "REAL"
        confidence = float(avg_prob * 100 if avg_prob > 0.5 else (1 - avg_prob) * 100)
        
        return {
            "success": True,
            "prediction": prediction,
            "confidence": round(confidence, 2)
        }
