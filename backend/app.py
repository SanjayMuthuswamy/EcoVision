from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import torch
from services.deforestation_service import load_model, compare_deforestation
import os, shutil

# Create app
app = FastAPI(title="EcoSense Backend", version="1.0")

# Enable CORS so frontend (React) can call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev mode
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your model once
model = load_model()
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
def root():
    return {"message": "🌍 EcoSense API is running successfully!"}

# ✅ The main endpoint your frontend calls
@app.post("/deforestationdetection")
async def deforestation_detection(
    before: UploadFile = File(...),
    after: UploadFile = File(...)
):
    """Compare two images for deforestation detection."""

    before_path = os.path.join(UPLOAD_DIR, f"before_{before.filename}")
    after_path = os.path.join(UPLOAD_DIR, f"after_{after.filename}")

    # Save files locally
    with open(before_path, "wb") as f:
        shutil.copyfileobj(before.file, f)
    with open(after_path, "wb") as f:
        shutil.copyfileobj(after.file, f)

    # Run model comparison
    result = compare_deforestation(before_path, after_path, model)

    # Clean up
    os.remove(before_path)
    os.remove(after_path)

    return {
        "status": "success",
        "endpoint": "http://localhost:8000/deforestationdetection",
        "result": result
    }
