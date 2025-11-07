import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, DetectionStatus } from '../types';

const analysisModelName = 'gemini-2.5-flash';

const analysisPrompt = `
You are an expert environmental analyst specializing in satellite imagery.
Your task is to analyze two images provided: a "before" image and an "after" image of the same geographical area.
Compare these two images to detect signs of deforestation.

Your analysis should result in a JSON object with two fields:
1.  "status": A string that must be one of the following: "DEFORESTATION", "NO_DEFORESTATION".
2.  "explanation": A concise, one-paragraph explanation (2-3 sentences) of your findings, written in a clear and accessible manner. Detail the visual evidence you used to reach your conclusion (e.g., "significant reduction in tree canopy," "no discernible change in forest density," "evidence of land clearing").

Analyze the provided images and return only the JSON object.
`;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    status: {
      type: Type.STRING,
      enum: ["DEFORESTATION", "NO_DEFORESTATION"],
      description: "The detection status of deforestation."
    },
    explanation: {
      type: Type.STRING,
      description: "A concise explanation of the findings."
    }
  },
  required: ["status", "explanation"],
};

export const analyzeDeforestation = async (
  beforeImage: {data: string, mimeType: string},
  afterImage: {data: string, mimeType: string},
): Promise<AnalysisResult> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const beforeImagePart = { inlineData: { mimeType: beforeImage.mimeType, data: beforeImage.data } };
    const afterImagePart = { inlineData: { mimeType: afterImage.mimeType, data: afterImage.data } };

    const response = await ai.models.generateContent({
      model: analysisModelName,
      // Fix: Aligned contents structure with Gemini API guidelines for single-turn multimodal requests.
      contents: {
          parts: [
            { text: analysisPrompt },
            { text: "Here is the 'before' image:" },
            beforeImagePart,
            { text: "And here is the 'after' image:" },
            afterImagePart,
          ],
        },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    // Fix: Simplified JSON parsing by removing unnecessary cleanup of markdown fences.
    // The Gemini API should return a clean JSON string when responseMimeType is "application/json".
    const result = JSON.parse(response.text);

    if (result.status === "DEFORESTATION") {
        return { status: DetectionStatus.DEFORESTATION, explanation: result.explanation };
    } else if (result.status === "NO_DEFORESTATION") {
        return { status: DetectionStatus.NO_DEFORESTATION, explanation: result.explanation };
    } else {
        return { status: DetectionStatus.ERROR, explanation: "The model returned an unexpected status." };
    }
  } catch (error) {
    console.error("Error analyzing images with Gemini:", error);
    let errorMessage = "An unknown error occurred during analysis.";
    if (error instanceof Error) {
        errorMessage = `Failed to analyze images. The AI could not process the request. Please try again with different images.`;
    }
    return { status: DetectionStatus.ERROR, explanation: errorMessage };
  }
};


export const generateVideoFromImage = async (
    image: { data: string, mimeType: string },
    prompt: string,
    aspectRatio: '16:9' | '9:16',
    onProgress: (message: string) => void
): Promise<string> => {
    // Re-initialize to ensure the latest API key from the dialog is used.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    onProgress("Generating video (this may take a few minutes)...");
    let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        image: {
            imageBytes: image.data,
            mimeType: image.mimeType,
        },
        config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: aspectRatio,
        }
    });

    onProgress("Polling for results...");
    while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        try {
             operation = await ai.operations.getVideosOperation({ operation: operation });
        } catch(e: any) {
            // Check for API key error
            if (e.message?.includes("Requested entity was not found")) {
                throw new Error("API_KEY_ERROR");
            }
            throw e;
        }
    }

    onProgress("Fetching video data...");
    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) {
        throw new Error("Video generation failed, no download link found.");
    }
    
    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    if (!response.ok) {
        throw new Error(`Failed to download video: ${response.statusText}`);
    }

    const videoBlob = await response.blob();
    return URL.createObjectURL(videoBlob);
};