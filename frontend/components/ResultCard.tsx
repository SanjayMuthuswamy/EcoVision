import React from 'react';
import { motion } from 'framer-motion';
import { type AnalysisResult, DetectionStatus } from '../types';
import { LeafIcon, StumpIcon, AlertIcon } from './Icons';

interface ResultCardProps {
  result: AnalysisResult;
}

interface ResultDisplayConfig {
  icon: React.ReactNode;
  title: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

const resultConfigs: Record<DetectionStatus, ResultDisplayConfig> = {
  [DetectionStatus.NO_DEFORESTATION]: {
    icon: <LeafIcon className="w-16 h-16" />,
    title: "No Deforestation Detected",
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    borderColor: 'border-green-300',
  },
  [DetectionStatus.DEFORESTATION]: {
    icon: <StumpIcon className="w-16 h-16" />,
    title: "Deforestation Detected",
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
    borderColor: 'border-red-300',
  },
  [DetectionStatus.ERROR]: {
    icon: <AlertIcon className="w-16 h-16" />,
    title: "Analysis Error",
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    borderColor: 'border-yellow-300',
  },
  [DetectionStatus.IDLE]: { icon: null, title: '', bgColor: '', textColor: '', borderColor: ''},
  [DetectionStatus.ANALYZING]: { icon: null, title: '', bgColor: '', textColor: '', borderColor: ''},
};

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const config = resultConfigs[result.status];

  if (!config || !config.icon) return null;

  return (
    <motion.div 
      className={`w-full max-w-2xl p-6 rounded-2xl border ${config.borderColor} ${config.bgColor} shadow-md`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex flex-col items-center text-center">
        <div className={`${config.textColor}`}>{config.icon}</div>
        <h2 className={`mt-4 text-2xl font-bold ${config.textColor}`}>{config.title}</h2>
        <div className="mt-4 text-left text-gray-700 bg-white/50 p-4 rounded-lg border border-gray-200 w-full">
          <h3 className="font-semibold text-gray-800 mb-1">AI Analysis:</h3>
          <p className="text-base leading-relaxed">{result.explanation}</p>
        </div>
      </div>
    </motion.div>
  );
};