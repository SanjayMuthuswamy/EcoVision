
export enum DetectionStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  NO_DEFORESTATION = 'NO_DEFORESTATION',
  DEFORESTATION = 'DEFORESTATION',
  ERROR = 'ERROR',
}

export interface AnalysisResult {
  status: DetectionStatus;
  explanation: string;
}

export enum VideoStatus {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export interface VideoResult {
    status: VideoStatus;
    message: string;
    videoUrl?: string;
}
