'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.random() * 12;
      });
    }, 250);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  }, []);

  const letters = "LOADING".split("");

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-700 to-gray-900 z-50 fixed top-0 left-0 overflow-hidden">
      <div className="absolute inset-0">
        {dimensions &&
          [...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-px bg-gray-800 rounded-full opacity-10"
              initial={{
                x: Math.random() * dimensions.width,
                y: Math.random() * dimensions.height,
              }}
              animate={{
                x: Math.random() * dimensions.width,
                y: Math.random() * dimensions.height,
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                duration: Math.random() * 15 + 15,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
      </div>

   
      <div className="relative z-10 flex flex-col items-center space-y-12">
       
        <div className="flex space-x-3">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              className="text-7xl font-bold text-white tracking-wider"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                textShadow: '0 0 30px rgba(245, 245, 245, 0.3), 0 0 60px rgba(217, 119, 6, 0.2)'
              }}
              initial={{
                opacity: 0,
                y: 80,
                rotateX: -90,
                filter: 'blur(10px)'
              }}
              animate={{
                opacity: 1,
                y: 0,
                rotateX: 0,
                filter: 'blur(0px)'
              }}
              transition={{
                duration: 1.2,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{
                scale: 1.05,
                textShadow: '0 0 40px rgba(245, 245, 245, 0.5)'
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        <motion.div
          className="w-96 h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '24rem', opacity: 0.6 }}
          transition={{ duration: 2, delay: 1 }}
        />

        <div className="flex flex-col items-center space-y-4">
          <div className="w-80 h-1 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-200 via-white to-amber-100 rounded-full shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                boxShadow: '0 0 20px rgba(245, 245, 245, 0.3)'
              }}
            />
          </div>
          <motion.div
            className="text-amber-200 text-lg font-medium tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            {Math.round(Math.min(progress, 100))}%
          </motion.div>
        </div>

        <div className="relative">
          <motion.div
            className="w-16 h-16 border-2 border-gray-700 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1 }}
          />
          <motion.div
            className="absolute inset-0 w-16 h-16 border-2 border-transparent border-t-white border-r-amber-200 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 w-12 h-12 border border-transparent border-t-amber-100 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="absolute">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gray-800 rounded-full opacity-20"
              initial={{ x: 0, y: 0 }}
              animate={{
                x: Math.cos(i * Math.PI / 2) * 120,
                y: Math.sin(i * Math.PI / 2) * 120,
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-30 pointer-events-none" />
      <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-amber-200 opacity-20" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-amber-200 opacity-20" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-amber-200 opacity-20" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-amber-200 opacity-20" />
    </div>
  );
}
