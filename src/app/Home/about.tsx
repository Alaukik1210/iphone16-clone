'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const sectionRef = useRef(null);
  // const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <div
      ref={sectionRef}
      className="min-h-[10%] bg-gradient-to-br from-black via-gray-900 to-black max-w-screen flex flex-col items-center justify-center p-8 relative overflow-hidden"
    >
      {/* iPhone 16 Pro Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-light text-white/80 tracking-wide text-center">
          iPhone 16 Pro
        </h1>
      </motion.div>

      {/* Main Glowing Text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
        className="relative"
      >
        {/* Background glow layer */}
        <div className="absolute inset-0 blur-2xl opacity-60">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent leading-tight text-center">
            Built for Apple Intelligence.
          </h2>
        </div>

        {/* Animated Glow */}
        <motion.h2
          animate={{
            textShadow: [
              '0 0 20px rgba(251, 146, 60, 0.5), 0 0 40px rgba(236, 72, 153, 0.3), 0 0 60px rgba(147, 51, 234, 0.2)',
              '0 0 30px rgba(251, 146, 60, 0.7), 0 0 50px rgba(236, 72, 153, 0.4), 0 0 80px rgba(147, 51, 234, 0.3)',
              '0 0 20px rgba(251, 146, 60, 0.5), 0 0 40px rgba(236, 72, 153, 0.3), 0 0 60px rgba(147, 51, 234, 0.2)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-orange-300 via-pink-400 to-purple-500 bg-clip-text text-transparent leading-tight text-center"
          style={{
            textShadow:
              '0 0 20px rgba(251, 146, 60, 0.5), 0 0 40px rgba(236, 72, 153, 0.3), 0 0 60px rgba(147, 51, 234, 0.2)',
          }}
        >
          Built for Apple Intelligence.
        </motion.h2>
      </motion.div>

      {/* Ambient glow orb */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-orange-500/10 via-pink-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Floating Particles (looped) */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            repeatType: 'loop',
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default About;
