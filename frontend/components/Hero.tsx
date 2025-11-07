import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedLeafIcon } from './Icons';

interface HeroProps {
    scrollToRef: React.RefObject<HTMLElement>;
}

export const Hero: React.FC<HeroProps> = ({ scrollToRef }) => {
    const handleScroll = () => {
        scrollToRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
    <div className="relative text-center overflow-hidden bg-gradient-to-b from-green-100 via-green-50 to-[#FBFBF9] h-screen flex flex-col justify-center items-center px-4">
      {Array.from({ length: 15 }).map((_, i) => (
        <AnimatedLeafIcon key={i} custom={i / 15} />
      ))}
      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-5xl tracking-tight font-extrabold text-gray-900 sm:text-6xl md:text-7xl">
          <span className="block xl:inline">EcoVision</span>
          <span className="block text-green-700 xl:inline"> 🌿</span>
        </h1>
        <p className="mt-4 max-w-md mx-auto text-lg text-gray-600 sm:text-xl md:mt-5 md:max-w-2xl">
          AI-powered insights to monitor and protect our world's forests.
          See the change, drive the action.
        </p>
        <div className="mt-8 flex justify-center">
            <button
                onClick={handleScroll}
                className="bg-green-600 text-white font-bold py-4 px-10 rounded-full hover:bg-green-700 transition-all transform hover:scale-105 shadow-xl text-lg"
            >
                Start Detection
            </button>
        </div>
      </motion.div>
    </div>
  );
};