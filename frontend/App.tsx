import React, { useState, useCallback, useRef } from "react";
import { Hero } from "./components/Hero";
import { ImageUploader } from "./components/ImageUploader";
import { ResultCard } from "./components/ResultCard";
import { Spinner } from "./components/Spinner";
import { About } from "./components/About";
import { AnalysisResult, DetectionStatus } from "./types";

// ✅ Directly send FormData to backend
const analyzeDeforestation = async (
  beforeFile: File,
  afterFile: File
): Promise<AnalysisResult> => {
  const formData = new FormData();
  formData.append("before", beforeFile);
  formData.append("after", afterFile);

  try {
    const response = await fetch("http://127.0.0.1:8000/deforestationdetection", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const result = await response.json();

    // Match backend response
    if (result.status === "success") {
      const changeMsg = result.result.Change_Detected;

      if (changeMsg.includes("No significant change")) {
        return {
          status: DetectionStatus.NO_DEFORESTATION,
          explanation: "✅ No significant deforestation detected between the images.",
        };
      } else {
        return {
          status: DetectionStatus.DEFORESTATION,
          explanation: "🚨 Deforestation detected — notable vegetation changes found.",
        };
      }
    }

    return {
      status: DetectionStatus.ERROR,
      explanation: "⚠️ Unexpected backend response format.",
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      status: DetectionStatus.ERROR,
      explanation: "❌ Failed to connect to backend or process images.",
    };
  }
};

function App() {
  const [beforeImageFile, setBeforeImageFile] = useState<File | null>(null);
  const [afterImageFile, setAfterImageFile] = useState<File | null>(null);
  const [beforeImagePreview, setBeforeImagePreview] = useState<string | null>(null);
  const [afterImagePreview, setAfterImagePreview] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [detectionStatus, setDetectionStatus] = useState<DetectionStatus>(DetectionStatus.IDLE);
  const analysisSectionRef = useRef<HTMLDivElement>(null);

  // Handle selecting an image
  const handleImageSelect = (
    file: File,
    setter: React.Dispatch<React.SetStateAction<File | null>>,
    previewSetter: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    setter(file);
    previewSetter(URL.createObjectURL(file));
    setAnalysisResult(null);
    setDetectionStatus(DetectionStatus.IDLE);
  };

  const handleBeforeImageSelect = useCallback(
    (file: File) => handleImageSelect(file, setBeforeImageFile, setBeforeImagePreview),
    []
  );

  const handleAfterImageSelect = useCallback(
    (file: File) => handleImageSelect(file, setAfterImageFile, setAfterImagePreview),
    []
  );

  // Analyze button handler
  const handleAnalyzeClick = async () => {
    if (!beforeImageFile || !afterImageFile) return;

    setDetectionStatus(DetectionStatus.ANALYZING);
    setAnalysisResult(null);

    try {
      const result = await analyzeDeforestation(beforeImageFile, afterImageFile);
      setAnalysisResult(result);
      setDetectionStatus(result.status);
    } catch (error) {
      console.error("Analysis failed:", error);
      setAnalysisResult({
        status: DetectionStatus.ERROR,
        explanation: "An unexpected error occurred during analysis.",
      });
      setDetectionStatus(DetectionStatus.ERROR);
    }
  };

  // Reset button handler
  const handleReset = () => {
    setBeforeImageFile(null);
    setAfterImageFile(null);
    if (beforeImagePreview) URL.revokeObjectURL(beforeImagePreview);
    if (afterImagePreview) URL.revokeObjectURL(afterImagePreview);
    setBeforeImagePreview(null);
    setAfterImagePreview(null);
    setAnalysisResult(null);
    setDetectionStatus(DetectionStatus.IDLE);
  };

  return (
    <div className="min-h-screen text-gray-800">
      {/* Landing Section */}
      <Hero scrollToRef={analysisSectionRef} />

      <main className="px-4 py-16 sm:py-24 space-y-16 sm:space-y-24">
        <section
          ref={analysisSectionRef}
          id="analysis-tool"
          className="container mx-auto flex flex-col items-center"
        >
          {/* Upload and Analyze Card */}
          <div className="w-full max-w-4xl p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/80">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
              Deforestation Detector
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Upload two images of the same area to detect environmental changes.
            </p>

            {/* Uploaders */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <ImageUploader
                id="before-image"
                title="Before 🌱"
                onImageSelect={handleBeforeImageSelect}
                imagePreviewUrl={beforeImagePreview}
              />
              <ImageUploader
                id="after-image"
                title="After 🌳"
                onImageSelect={handleAfterImageSelect}
                imagePreviewUrl={afterImagePreview}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-center flex-wrap gap-4">
              <button
                onClick={handleAnalyzeClick}
                disabled={
                  !beforeImageFile || !afterImageFile || detectionStatus === DetectionStatus.ANALYZING
                }
                className="bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-all transform hover:scale-105 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none"
              >
                {detectionStatus === DetectionStatus.ANALYZING
                  ? "Analyzing..."
                  : "Analyze Change"}
              </button>
              <button
                onClick={handleReset}
                className="bg-gray-200 text-gray-800 font-semibold py-3 px-8 rounded-full hover:bg-gray-300 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Result + Spinner */}
          <div className="w-full mt-12 flex flex-col items-center">
            {detectionStatus === DetectionStatus.ANALYZING && <Spinner />}
            {analysisResult && <ResultCard result={analysisResult} />}
          </div>
        </section>

        <About />
      </main>
    </div>
  );
}

export default App;
