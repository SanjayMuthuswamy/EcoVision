import React, { useState } from 'react';
import { ImageUploader } from './ImageUploader';
import { ResultCard } from './ResultCard';
import { DetectionStatus, AnalysisResult } from '../types';

export const DeforestationDetector: React.FC = () => {
  const [beforeImage, setBeforeImage] = useState<File | null>(null);
  const [afterImage, setAfterImage] = useState<File | null>(null);
  const [beforePreview, setBeforePreview] = useState<string | null>(null);
  const [afterPreview, setAfterPreview] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult>({
    status: DetectionStatus.IDLE,
    explanation: '',
  });

  const handleImageSelect = (file: File, type: 'before' | 'after') => {
    const preview = URL.createObjectURL(file);
    if (type === 'before') {
      setBeforeImage(file);
      setBeforePreview(preview);
    } else {
      setAfterImage(file);
      setAfterPreview(preview);
    }
  };

  const handleAnalyze = async () => {
    if (!beforeImage || !afterImage) {
      alert('Please upload both images first!');
      return;
    }

    setResult({ status: DetectionStatus.ANALYZING, explanation: '' });

    try {
      const formData = new FormData();
      formData.append('before', beforeImage);
      formData.append('after', afterImage);

      const response = await fetch('http://localhost:8000/deforestationdetection', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Server error');
      const data = await response.json();

      const change = data.result.Change_Detected.toLowerCase();

      let status: DetectionStatus = DetectionStatus.NO_DEFORESTATION;
      if (change.includes('deforestation')) status = DetectionStatus.DEFORESTATION;
      if (change.includes('error')) status = DetectionStatus.ERROR;

      setResult({
        status,
        explanation: `
          Before Image: ${data.result.Before_Image.prediction} (${data.result.Before_Image.confidence})
          After Image: ${data.result.After_Image.prediction} (${data.result.After_Image.confidence})
          Result: ${data.result.Change_Detected}
        `,
      });
    } catch (error) {
      console.error(error);
      setResult({
        status: DetectionStatus.ERROR,
        explanation: 'Failed to connect to backend. Please check if FastAPI is running.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 flex flex-col items-center justify-center p-8 space-y-8">
      <h1 className="text-4xl font-bold text-green-800 mb-4">🌍 Deforestation Detection</h1>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center">
        <ImageUploader
          id="before-upload"
          title="Before Image"
          onImageSelect={(file) => handleImageSelect(file, 'before')}
          imagePreviewUrl={beforePreview}
        />
        <ImageUploader
          id="after-upload"
          title="After Image"
          onImageSelect={(file) => handleImageSelect(file, 'after')}
          imagePreviewUrl={afterPreview}
        />
      </div>

      <button
        onClick={handleAnalyze}
        className="px-6 py-3 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 transition-all duration-200 font-semibold disabled:opacity-50"
        disabled={!beforeImage || !afterImage}
      >
        Analyze 🌿
      </button>

      {result.status !== DetectionStatus.IDLE && <ResultCard result={result} />}
    </div>
  );
};
