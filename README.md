# 🌳 Deforestation Detection using Deep Learning  

> An AI-powered model that detects **deforestation** from satellite images uploaded up user using **ResNet-18 (Transfer Learning)**.  

## 🚀 Overview  
This project employs a **Convolutional Neural Network (CNN)** to classify satellite images as **forested** or **deforested**.  
Utilizing **ResNet-18** and **transfer learning**, it achieves high accuracy even with limited training data.

## 🧩 Features  
✅ Analyzes before/after satellite images to detect deforestation  
✅ High accuracy classification using transfer learning  
✅ Simple and intuitive user interface

## 🧰 Tech Stack  
| Technology      | Description                          |
|------------------|--------------------------------------|
| Python           | Programming language used            |
| PyTorch          | Deep learning framework              |
| FastAPI          | Web framework for building APIs      |
| Matplotlib       | Plotting library for visualizations  |
| Pillow           | Image processing library             |
| React            | JavaScript library for UI            |
| Tailwind CSS     | Utility-first CSS framework          |

## ⚙️ Installation  

```bash
# Clone the repository
git clone https://github.com/SanjayMuthuswamy/EcoVision.git
cd EcoVision

# Install Python dependencies
pip install torch torchvision matplotlib pillow fastapi uvicorn
```

## 🚀 Run the Backend  
```bash
# Start the FastAPI server
uvicorn main:app --reload
```

## 🌐 Frontend 
To run the frontend, navigate to the frontend directory and execute `npm run dev`.

## 🔍 How It Works  
1. The model processes satellite images using a pre-trained ResNet-18 architecture.  
2. It classifies images into forested or deforested categories based on learned features.  
3. Users can upload images and receive instant feedback on deforestation status.  
