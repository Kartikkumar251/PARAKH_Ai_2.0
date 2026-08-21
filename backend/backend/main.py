from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os

from detector import DeepfakeDetector

app = FastAPI(title="PARAKH AI Detection API")

# Configure CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize detector globally
detector = DeepfakeDetector()

@app.post("/api/detect")
async def detect_media(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")

    # Read bytes
    content = await file.read()
    
    # Check mime type
    mime = file.content_type
    if mime and mime.startswith("image/"):
        result = detector.predict_image(content)
        result["media_type"] = "image"
        return result
    elif mime and mime.startswith("video/"):
        result = detector.predict_video(content)
        result["media_type"] = "video"
        return result
    else:
        # Fallback to checking extension
        ext = os.path.splitext(file.filename)[1].lower()
        if ext in ['.jpg', '.jpeg', '.png', '.bmp', '.webp']:
            result = detector.predict_image(content)
            result["media_type"] = "image"
            return result
        elif ext in ['.mp4', '.avi', '.mov', '.mkv']:
            result = detector.predict_video(content)
            result["media_type"] = "video"
            return result
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
