import os
import cv2
import onnx
import torch
import numpy as np
from onnx2pytorch import ConvertModel

# Setup paths
repo_dir = os.path.join("backend", "ml_model", "AI-Generated-Video-Detector")
onnx_path = os.path.join(repo_dir, "checkpoints", "efficientnet.onnx")
pth_path = os.path.join(repo_dir, "checkpoints", "model.pth")

print("Loading ONNX model...")
onnx_model = onnx.load(onnx_path)
pytorch_model = ConvertModel(onnx_model)

print("Loading PyTorch weights...")
ckpt = torch.load(pth_path, map_location=torch.device('cpu'))
pytorch_model.load_state_dict(ckpt['rgb_encoder'], strict=True)
pytorch_model.eval()

print("Creating dummy image...")
dummy_face = np.random.randint(0, 255, (256, 256, 3), dtype=np.uint8)

# Preprocessing exactly as in inference_2.py
face = dummy_face / 255.0
face = cv2.resize(face, (256, 256))
# Try with and without transpose
try:
    face_pt = torch.unsqueeze(torch.Tensor(face), dim=0) 
    print(f"Face shape: {face_pt.shape}")
    img_grads = pytorch_model(face_pt)
    print("Inference successful WITHOUT transpose! Output shape:", img_grads.shape)
    print("Raw output:", img_grads)
except Exception as e:
    print("Failed WITHOUT transpose. Error:", e)

    print("Trying WITH transpose...")
    face_t = dummy_face / 255.0
    face_t = cv2.resize(face_t, (256, 256))
    face_t = face_t.transpose(2, 0, 1) #(W, H, C) -> (C, W, H)
    face_pt = torch.unsqueeze(torch.Tensor(face_t), dim=0) 
    print(f"Face shape: {face_pt.shape}")
    img_grads = pytorch_model(face_pt)
    print("Inference successful WITH transpose! Output shape:", img_grads.shape)
    print("Raw output:", img_grads)
