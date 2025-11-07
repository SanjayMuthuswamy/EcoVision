from fastapi import APIRouter, UploadFile, File
import shutil
import os
from services.deforestation_service import load_model, compare_deforestation

router = APIRouter()

# Load model once at startup
model = load_model()
device = "cpu"

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/deforestationdetection")
async def deforestation_detection_route(
    before: UploadFile = File(...),
    after: UploadFile = File(...)
):
    """
    Endpoint: http://localhost:8000/deforestationdetection
    Upload 'before' and 'after' images to detect deforestation/reforestation
    """

    before_path = os.path.join(UPLOAD_DIR, f"before_{before.filename}")
    after_path = os.path.join(UPLOAD_DIR, f"after_{after.filename}")

    # Save both uploaded images
    with open(before_path, "wb") as f_before:
        shutil.copyfileobj(before.file, f_before)
    with open(after_path, "wb") as f_after:
        shutil.copyfileobj(after.file, f_after)

    # Run prediction comparison
    result = compare_deforestation(before_path, after_path, model, device)

    # Optional cleanup
    os.remove(before_path)
    os.remove(after_path)

    return {
        "status": "success",
        "endpoint": "http://localhost:8000/deforestationdetection",
        "result": result
    }
