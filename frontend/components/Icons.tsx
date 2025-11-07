
import React from 'react';
import { motion } from 'framer-motion';

export const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

export const CircularProgressIcon: React.FC<{ progress: number }> = ({ progress }) => (
    <svg className="w-full h-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200" strokeWidth="2"></circle>
        <g className="origin-center -rotate-90 transform">
            <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-current text-green-500"
                strokeWidth="2"
                strokeDasharray="100"
                strokeDashoffset={100 - progress}
            ></circle>
        </g>
    </svg>
);

export const LeafIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M15.936 2.5a3.53 3.53 0 00-5.004 0L10 3.442l-.932-.942a3.53 3.53 0 00-5.004 0 3.543 3.543 0 000 5.013l.39.392c.384.385.808.732 1.264 1.033.456.302.94.535 1.442.695a.47.47 0 01.336.45V18.5a.5.5 0 00.5.5h2a.5.5 0 00.5-.5v-7.472a.47.47 0 01.336-.45c.502-.16.986-.393 1.442-.695.456-.301.88-.648 1.264-1.033l.39-.392a3.543 3.543 0 000-5.013z" clipRule="evenodd" />
    </svg>
);

export const StumpIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531a3.374 3.374 0 00-.823-2.174l-.547-.547z"></path>
    </svg>
);

export const AlertIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);

export const AnimatedLeafIcon: React.FC<{ custom: number }> = ({ custom }) => (
  <motion.div
    className="absolute"
    style={{
      scale: 0.5 + Math.random() * 0.8,
      opacity: 0.4 + Math.random() * 0.5,
      x: `${custom * 20 - 10}vw`,
    }}
    animate={{
      y: ['-20vh', '120vh'],
      x: [`${custom * 20 - 10 + (Math.random() - 0.5) * 5}vw`, `${custom * 20 - 10 + (Math.random() - 0.5) * 15}vw`],
      rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
    }}
    transition={{
      duration: 10 + Math.random() * 15,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'linear',
      delay: Math.random() * 10,
    }}
  >
    <LeafIcon className="w-8 h-8 text-green-500" />
  </motion.div>
);
