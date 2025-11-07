# 🌳 Deforestation Detection using Deep Learning  

> 🧠 An AI-powered model that detects **deforestation** from images using **ResNet-18 (Transfer Learning)**.  
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
It uses **ResNet-18** with **transfer learning**, allowing high accuracy with limited data.

You can use it to:
- Detect deforestation automatically  
- Compare “before” and “after” satellite images  
- Support environmental monitoring or policy projects  

---

## 🧩 Features  
✅ Detects deforestation in before/after images  
✅ Uses transfer learning with ResNet-18  
✅ High accuracy on small datasets  
✅ Plots training accuracy per epoch  
✅ Supports single-image and batch prediction  

---

## 🧠 Model Architecture  
**Base Model:** ResNet-18 pretrained on ImageNet  
**Modified Layer:** Fully connected layer → 2 outputs  
**Classes:** `Forested`, `Non-deforest`  
**Framework:** PyTorch  

```python
self.model = models.resnet18(pretrained=True)
num_ftrs = self.model.fc.in_features
self.model.fc = nn.Linear(num_ftrs, 2)


deforestation dataset/
│
├── train data/
│   ├── forested/
│   └── non-deforest/
│
└── test data/
    ├── forested/
    └── non-deforest/


git clone https://github.com/your-username/deforestation-detection.git
cd deforestation-detection


pip install torch torchvision matplotlib pillow

🎯 Test Accuracy: 91%


| Layer                   | Technology                           | Description                                                 |
| ----------------------- | ------------------------------------ | ----------------------------------------------------------- |
| **Language**            | 🐍 **Python 3.10+**                  | Core programming language                                   |
| **Framework**           | ⚡ **PyTorch**                        | Deep learning framework used for CNN training and inference |
| **Model**               | 🧠 **ResNet-18 (Transfer Learning)** | Pretrained CNN used for deforestation classification        |
| **Visualization**       | 📊 **Matplotlib**                    | Used for plotting accuracy and visualizing predictions      |
| **Image Processing**    | 🖼️ **Pillow (PIL)**                 | For loading and transforming images                         |
| **Runtime Environment** | 💻 **Google Colab / Local Machine**  | GPU-accelerated environment for training and testing        |
| **Optional Bac**        |                                      |                                                             |
