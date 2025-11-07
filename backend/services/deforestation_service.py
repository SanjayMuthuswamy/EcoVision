import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import torch.nn.functional as F

# ✅ Define CNN architecture
class DeforestationCNN(nn.Module):
    def __init__(self):
        super(DeforestationCNN, self).__init__()
        self.model = models.resnet18(weights=None)
        num_ftrs = self.model.fc.in_features
        self.model.fc = nn.Linear(num_ftrs, 2)

    def forward(self, x):
        return self.model(x)

# ✅ Load model
def load_model(model_path="models/deforestation_model.pth", device="cpu"):
    model = DeforestationCNN()
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.eval()
    return model

# ✅ Preprocessing
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

CLASSES = ["deforested", "non-deforested"]

# ✅ Predict a single image
def predict_single_image(image_path, model, device="cpu"):
    img = Image.open(image_path).convert("RGB")
    img_t = transform(img).unsqueeze(0).to(device)

    with torch.no_grad():
        outputs = model(img_t)
        probs = F.softmax(outputs, dim=1)
        _, pred = torch.max(probs, 1)
        result = CLASSES[pred.item()]
        confidence = round(float(probs[0][pred.item()]), 3)

    return {"prediction": result, "confidence": confidence}

# ✅ Compare before & after images
def compare_deforestation(before_path, after_path, model, device="cpu"):
    before_result = predict_single_image(before_path, model, device)
    after_result = predict_single_image(after_path, model, device)

    if before_result["prediction"] == "non-deforested" and after_result["prediction"] == "deforested":
        change = "⚠️ Deforestation detected"
    elif before_result["prediction"] == "deforested" and after_result["prediction"] == "non-deforested":
        change = "🌱 Reforestation detected"
    else:
        change = "✅ No significant change detected"

    return {
        "Before_Image": before_result,
        "After_Image": after_result,
        "Change_Detected": change
    }
