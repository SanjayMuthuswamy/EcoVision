# 🌳 Deforestation Detection using Deep Learning  

> An AI-powered model that detects **deforestation** from images using **ResNet-18 (Transfer Learning)**.  
> This system helps monitor environmental changes automatically and accurately.

---

## 🏷️ Badges  
![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)
![PyTorch](https://img.shields.io/badge/PyTorch-🔥_DeepLearning-red)
![License](https://img.shields.io/badge/License-MIT-green.svg)
![Platform](https://img.shields.io/badge/Platform-Colab%20%7C%20Local-yellow)

---

## 🚀 Overview  
This project trains a **Convolutional Neural Network (CNN)** to classify satellite images into **forested** or **non-deforested** areas.  
It uses **ResNet-18** with **transfer learning**, achieving high accuracy even with limited datasets.

You can use it to:
- 🌲 Detect deforestation automatically  
- 🛰️ Compare “before” and “after” satellite images  
- 🌍 Support environmental monitoring or policy analysis  

---

## 🧩 Features  
✅ Detects deforestation in before/after satellite images  
✅ Uses **transfer learning** with **ResNet-18**  
✅ High accuracy on **small datasets**  
✅ Plots **training accuracy per epoch**  
✅ Supports **single-image** and **batch predictions**  

---

## 🧠 Model Architecture  
**Base Model:** ResNet-18 pretrained on ImageNet  
**Modified Layer:** Fully connected layer → 2 outputs  
**Classes:** `Forested`, `Non-deforest`  
**Framework:** PyTorch  


# Clone the repository
git clone https://github.com/your-username/deforestation-detection.git
cd deforestation-detection

# Install dependencies
pip install torch torchvision matplotlib pillow


# Clone the repository
git clone https://github.com/your-username/deforestation-detection.git
cd deforestation-detection

# Install dependencies
pip install torch torchvision matplotlib pillow


## 🧰 Tech Stack  

- **Frontend:** ⚛️ **React + Tailwind CSS**  
  → Builds a fast, modern, and responsive UI for uploading images and displaying deforestation predictions.

- **Backend:** 🚀 **FastAPI (Python)**  
  → Handles API requests, connects to the deep learning model, and returns prediction results efficiently.

- **Model:** 🧠 **ResNet-18 (Transfer Learning)**  
  → Pretrained CNN architecture fine-tuned for deforestation detection using satellite imagery.

- **Language:** 🐍 **Python 3.10+**  
  → Core language used for both the backend and model development.

- **Framework:** 🔥 **PyTorch**  
  → Deep learning framework used to implement and train the ResNet-18 model.

- **Image Processing:** 🖼️ **Pillow (PIL)**  
  → Used for loading, resizing, and transforming satellite images before feeding into the model.

- **API Testing:** 🧪 **Postman / cURL**  
  → For testing API endpoints and verifying responses during backend development.


