'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import img1 from '@/assets/white.webp';
import img2 from '@/assets/teal.webp';
import img3 from '@/assets/iphone-yellow.webp';
import img4 from '@/assets/iphone-black.webp';
import Image from 'next/image';
const colors = [
  {
    name: 'Natural Titanium',
    value: 'natural',
    bg: 'from-gray-300 to-gray-500',
    image: img1,
  },
  {
    name: 'Teal Titanium',
    value: 'blue',
   bg: 'from-teal-400 to-teal-600',
    image: img2,
  },
  {
    name: 'Desert Titanium',
    value: 'white',
    bg: 'from-[#D7C9B4] to-[#A89F94]',
    image: img3,
  },
  {
    name: 'Black Titanium',
    value: 'black',
    bg: 'from-gray-700 to-black',
    image: img4,
  },
];

const features = [
  {
    title: 'A18 Pro Chip',
    description: 'The most powerful chip in a smartphone',
    detail: '3nm technology with 16-core Neural Engine'
  },
  {
    title: 'Pro Camera System',
    description: '48MP Main | 48MP Ultra Wide | 12MP Telephoto',
    detail: '5x optical zoom and macro photography'
  },
  {
    title: 'ProMotion Display',
    description: '6.3" Super Retina XDR with 120Hz',
    detail: 'Always-On display with Dynamic Island'
  },
  {
    title: 'Titanium Design',
    description: 'Aerospace-grade titanium construction',
    detail: 'Strongest and lightest Pro models ever'
  }
];

export default function Interactive() {
  const [selectedColor, setSelectedColor] = useState('natural');
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const selectedColorData = colors.find((c) => c.value === selectedColor);

  return (
    <div className="min-h-screen  bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      <section className="relative h-screen flex items-center justify-center">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${selectedColorData?.bg} opacity-10`}
          key={selectedColorData?.value}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 0.8 }}
        />

        <div className="container mx-auto px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center"
          >
            <motion.h1
              className="text-8xl md:text-9xl font-bold mb-4 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent"
              style={{ textShadow: '0 0 40px rgba(255,255,255,0.1)' }}
            >
              iPhone 16 Pro
            </motion.h1>

            <motion.p
              className="text-2xl md:text-3xl text-gray-300 mb-8 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Titanium. So strong. So light. So Pro.
            </motion.p>

            <motion.div
              className="relative mx-auto mb-12"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <div className="relative w-64 h-96 mx-auto">
                <motion.div
                  className="w-full h-full relative"
                  key={selectedColorData?.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {selectedColorData?.image && (
                    <Image
                      src={selectedColorData.image.src}
                      alt={`${selectedColorData.name} iPhone`}
                    className='w-full h-full object-contain'
                    width={256}
                    height={384}
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                      key={currentFeature}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="text-white text-center backdrop-blur-sm bg-black/30 px-4 py-2 rounded-xl"
                    >
                      <div className="text-lg font-semibold mb-1">
                        {features[currentFeature].title}
                      </div>
                      <div className="text-sm text-gray-300">
                        {features[currentFeature].description}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <h3 className="text-xl font-semibold mb-6">Choose your finish</h3>
              <div className="flex justify-center space-x-4">
                {colors.map((color) => (
                  <motion.button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${color.bg} border-2 transition-all duration-300 ${
                      selectedColor === color.value
                        ? 'border-white scale-110'
                        : 'border-gray-600 hover:border-gray-400'
                    }`}
                    whileHover={{ scale: selectedColor === color.value ? 1.1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AnimatePresence>
                      {selectedColor === color.value && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-white"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1.2, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
              </div>
              <p className="text-gray-400 mt-4">{selectedColorData?.name}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}