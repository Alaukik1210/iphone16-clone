// @ts-nocheck
'use client';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import img1 from '@/assets/white.webp';
import img2 from '@/assets/teal.webp';
import img3 from '@/assets/iphone-yellow.webp';
import img4 from '@/assets/iphone-black.webp';
// import Image from 'next/image';

interface Specification {
  title: string;
  icon: string;
  color: string;
  details: { label: string; value: string }[];
  interactive: {
    type: string;
    levels?: string[] | undefined;
  };
}

const specifications = {
  display: {
    title: "Super Retina XDR Display",
    icon: "📱",
    color: "from-blue-500 via-cyan-500 to-purple-600",
    details: [
      { label: "Size", value: "6.3-inch (diagonal)" },
      { label: "Technology", value: "OLED Super Retina XDR" },
      { label: "Resolution", value: "2556 x 1179 pixels at 460 ppi" },
      { label: "Refresh Rate", value: "ProMotion up to 120Hz" },
      { label: "Brightness", value: "1000 nits max (typical), 2000 nits (HDR)" },
      { label: "Features", value: "Dynamic Island, Always-On display, True Tone" }
    ],
    interactive: {
      type: "brightness",
      levels: ["25%", "50%", "75%", "100%", "HDR"]
    }
  },
  chip: {
    title: "A18 Pro Chip",
    icon: "⚡",
    color: "from-orange-500 via-red-500 to-pink-600",
    details: [
      { label: "Process", value: "3-nanometer technology" },
      { label: "CPU", value: "6-core with 2 performance and 4 efficiency cores" },
      { label: "GPU", value: "6-core GPU" },
      { label: "Neural Engine", value: "16-core Neural Engine" },
      { label: "Memory", value: "8GB unified memory" },
      { label: "Performance", value: "Up to 20% faster than A17 Pro" }
    ],
    interactive: {
      type: "performance",
      benchmarks: [
        { test: "CPU Single-Core", score: "3850", max: "4000" },
        { test: "CPU Multi-Core", score: "15200", max: "16000" },
        { test: "GPU", score: "28500", max: "30000" },
        { test: "Neural Engine", score: "35.8 TOPS", max: "40 TOPS" }
      ]
    }
  },
  camera: {
    title: "Pro Camera System",
    icon: "📸",
    color: "from-emerald-500 via-teal-500 to-cyan-600",
    details: [
      { label: "Main Camera", value: "48MP f/1.78 with 2x Telephoto" },
      { label: "Ultra Wide", value: "48MP f/2.2 with macro photography" },
      { label: "Telephoto", value: "12MP f/2.8 with 5x optical zoom" },
      { label: "Front Camera", value: "12MP TrueDepth f/1.9" },
      { label: "Video", value: "4K ProRes, Cinematic mode, Action mode" },
      { label: "Features", value: "Camera Control, Photographic Styles" }
    ],
    interactive: {
      type: "zoom",
      levels: ["0.5x", "1x", "2x", "3x", "5x"]
    }
  },
  battery: {
    title: "All-Day Battery Life",
    icon: "🔋",
    color: "from-green-500 via-emerald-500 to-teal-600",
    details: [
      { label: "Video Playback", value: "Up to 27 hours" },
      { label: "Audio Playback", value: "Up to 75 hours" },
      { label: "Charging", value: "MagSafe up to 25W, Qi2 up to 15W" },
      { label: "Wired Charging", value: "USB-C up to 27W" },
      { label: "Fast Charging", value: "50% charge in 30 minutes" },
      { label: "Wireless", value: "MagSafe and Qi2 compatible" }
    ],
    interactive: {
      type: "battery",
      activities: [
        { name: "Video", hours: 27, icon: "🎥" },
        { name: "Audio", hours: 75, icon: "🎵" },
        { name: "Internet", hours: 22, icon: "🌐" },
        { name: "Gaming", hours: 18, icon: "🎮" }
      ]
    }
  },
  design: {
    title: "Titanium Design",
    icon: "✨",
    color: "from-slate-400 via-gray-500 to-zinc-600",
    details: [
      { label: "Materials", value: "Grade 5 titanium with textured matte glass back" },
      { label: "Dimensions", value: "159.9 × 76.7 × 8.25 mm" },
      { label: "Weight", value: "199 grams" },
      { label: "Water Resistance", value: "IP68 (6 meters up to 30 minutes)" },
      { label: "Colors", value: "Natural, Blue, White, Black Titanium" },
      { label: "Durability", value: "Ceramic Shield front, aerospace-grade titanium" }
    ],
    interactive: {
      type: "colors",
      options: ["Natural", "Blue", "White", "Black"]
    }
  },
  connectivity: {
    title: "Advanced Connectivity",
    icon: "📡",
    color: "from-indigo-500 via-purple-500 to-pink-600",
    details: [
      { label: "5G", value: "Sub-6 GHz and mmWave in US" },
      { label: "Wi-Fi", value: "Wi-Fi 7 (802.11be)" },
      { label: "Bluetooth", value: "Bluetooth 5.3" },
      { label: "USB", value: "USB-C with USB 3 (up to 10 Gb/s)" },
      { label: "Emergency", value: "Emergency SOS via satellite" },
      { label: "Location", value: "Precision GPS, GLONASS, Galileo, QZSS, BeiDou" }
    ],
    interactive: {
      type: "network",
      speeds: [
        { type: "5G mmWave", speed: "4 Gbps", bars: 5 },
        { type: "5G Sub-6", speed: "1.5 Gbps", bars: 4 },
        { type: "4G LTE", speed: "500 Mbps", bars: 3 },
        { type: "Wi-Fi 7", speed: "40 Gbps", bars: 5 }
      ]
    }
  }
};

export default function IPhone16ProSpecs() {
  const [activeSection, setActiveSection] = useState('display');
  const [interactiveState, setInteractiveState] = useState({
    
    design:{
      color: 0, 
    },
    
  });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  // const textY = useTransform(scrollYProgress, [0, 1], ['0%', '200%']);

  const phoneImages = {
    natural: img1,
    blue: img2,
    white: img3,
    black: img4
  };

  const selectedColorIndex = interactiveState.design?.color || 0;

  const selectedColorName = specifications.design.interactive.options[selectedColorIndex].toLowerCase();
  
  // @ts-expect-error i dont know
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
const phoneImage = phoneImages[selectedColorName];





  const renderInteractiveComponent = (spec:Specification) => {
    const interactive = spec.interactive;
    const currentState = interactiveState[activeSection as keyof typeof interactiveState] || {};



    switch (interactive.type )  {
      case 'brightness':
        if (!interactive.levels) return null;
        return (
          <div className="mt-8">
            <motion.h4 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-bold mb-6 text-white"
            >
              Display Brightness Control
            </motion.h4>
            <div className="flex flex-wrap gap-3 mb-6">
              {
               interactive?.levels.map((level, index) => (
                <motion.button
                  key={level}
                  onClick={() => setInteractiveState(prev => ({ ...prev, [activeSection]: { brightness: index } }))}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                   
                    (level || 0) === index
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {level}
                </motion.button>
              ))}
            </div>
            <motion.div 
              className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 h-40 flex items-center justify-center relative overflow-hidden border border-gray-800"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-600"
                animate={{ 
                  
                  opacity: ((currentState.brightness || 0) + 1) * 0.15,
                  
                  scale: 1 + ((currentState.brightness || 0) * 0.05)
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 blur-xl"
               
                animate={{ opacity: ((currentState.brightness || 0) + 1) * 0.1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="relative z-10 text-white font-bold text-lg"
              >
                iPhone Display at {
                
                interactive.levels[currentState.brightness || 0]}
              </div>
            </motion.div>
          </div>
        );

      case 'performance':
        return (
          <div className="mt-8">
            <motion.h4 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-bold mb-6 text-white"
            >
              Performance Benchmarks
            </motion.h4>
            <div className="space-y-4">
              {interactive.benchmarks.map((benchmark, index) => (
                <motion.div
                  key={benchmark.test}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
                  className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-4 border border-gray-700 hover:border-orange-500/30 transition-all duration-300"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-300 font-medium">{benchmark.test}</span>
                    <span className="text-white font-bold text-lg">{benchmark.score}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(parseInt(benchmark.score) / parseInt(benchmark.max)) * 100}%` }}
                      transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'zoom':
        return (
          <div className="mt-8">
            <motion.h4 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-bold mb-6 text-white"
            >
              Camera Zoom Control
            </motion.h4>
            <div className="flex flex-wrap gap-3 mb-6">
              {interactive.levels.map((level, index) => (
                <motion.button
                  key={level}
                  onClick={() => setInteractiveState(prev => ({ ...prev, [activeSection]: { zoom: index } }))}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    (currentState.zoom || 1) === index
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {level}
                </motion.button>
              ))}
            </div>
            <motion.div 
              className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 h-40 flex items-center justify-center relative overflow-hidden border border-gray-800"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="w-20 h-20 border-4 border-emerald-500 rounded-full flex items-center justify-center relative"
                animate={{ 
                  scale: 1 + (currentState.zoom || 1) * 0.4,
                  rotate: (currentState.zoom || 1) * 45
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <motion.div
                  className="absolute inset-0 border-2 border-emerald-400 rounded-full"
                  animate={{ scale: 1.2, opacity: 0.5 }}
                  transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                />
                <span className="text-emerald-400 font-bold text-lg relative z-10">
                  {interactive.levels[currentState.zoom || 1]}
                </span>
              </motion.div>
            </motion.div>
          </div>
        );

      case 'battery':
        return (
          <div className="mt-8">
            <motion.h4 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-bold mb-6 text-white"
            >
              Battery Life by Activity
            </motion.h4>
            <div className="grid grid-cols-2 gap-4">
              {interactive.activities.map((activity, index) => (
                <motion.div
                  key={activity.name}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5 text-center border border-gray-700 hover:border-green-500/30 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -3 }}
                >
                  <motion.div 
                    className="text-3xl mb-3"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {activity.icon}
                  </motion.div>
                  <motion.div 
                    className="text-white font-bold text-xl mb-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {activity.hours}h
                  </motion.div>
                  <div className="text-gray-400 text-sm">{activity.name}</div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'colors':
        return (
          <div className="mt-8">
            <motion.h4 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-bold mb-6 text-white"
            >
              Available Colors
            </motion.h4>
            <div className="grid grid-cols-2 gap-4">
              {interactive.options.map((color, index) => {
                const colorClasses = {
                  'Natural': 'from-gray-300 to-gray-500',
                  'Blue': 'from-blue-400 to-blue-600',
                  'White': 'from-gray-100 to-white',
                  'Black': 'from-gray-700 to-black'
                };
                return (
                  <motion.button
                    key={color}
                    onClick={() => setInteractiveState(prev => ({ ...prev, [activeSection]: { color: index } }))}
                    className={`p-5 rounded-xl border-2 transition-all duration-300 ${
                      (currentState.color || 0) === index
                        ? 'border-white shadow-lg shadow-white/20'
                        : 'border-gray-600 hover:border-gray-400'
                    }`}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div 
                      className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br ${colorClasses[color]} shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="text-white text-sm font-medium">{color}</div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        );

      case 'network':
        return (
          <div className="mt-8">
            <motion.h4 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-bold mb-6 text-white"
            >
              Network Performance
            </motion.h4>
            <div className="space-y-4">
              {interactive.speeds.map((network, index) => (
                <motion.div
                  key={network.type}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
                  className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-4 border border-gray-700 hover:border-indigo-500/30 transition-all duration-300"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-300 font-medium">{network.type}</span>
                    <span className="text-white font-bold text-lg">{network.speed}</span>
                  </div>
                  <div className="flex space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`w-4 rounded-sm ${
                          i < network.bars ? 'bg-gradient-to-t from-indigo-500 to-purple-500' : 'bg-gray-600'
                        }`}
                        style={{ height: `${16 + i * 6}px` }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: index * 0.1 + i * 0.05, duration: 0.3 }}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden" ref={containerRef}>
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"
          style={{ y: backgroundY }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      </div>

      {/* Hero Section */}
      {/* <section className="relative h-screen flex items-center justify-center z-10">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 100, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-7xl md:text-9xl font-black mb-8 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
            style={{ y: textY }}
          >
            iPhone 16 Pro
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-2xl md:text-3xl text-gray-300 mb-12 font-light"
          >
            Complete Technical Specifications
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.3, rotateY: 180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
            className="relative"
          >
           <Image
  src={phoneImage}
  alt={`iPhone 16 Pro in ${selectedColorName}`}
  width={256}
  height={384}
  className="w-80 h-96 mx-auto rounded-[3rem] shadow-2xl shadow-blue-500/20 object-cover"
/>

            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-[3rem]"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </section> */}

      {/* Navigation */}
      <motion.div 
        className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <div className="container mx-auto px-6">
          <div className="flex space-x-2 py-6 overflow-x-auto">
            {Object.entries(specifications).map(([key, spec], index) => (
              <motion.button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`px-6 py-3 rounded-xl whitespace-nowrap transition-all text-sm font-semibold border ${
                  activeSection === key
                    ? 'bg-gradient-to-r from-white to-gray-200 text-black border-white shadow-lg shadow-white/20'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50 border-gray-700 hover:border-gray-600'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + index * 0.1 }}
              >
                <span className="mr-2 text-lg">{spec.icon}</span>
                {spec.title}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Content - Side by Side */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-7xl mx-auto"
            >
              <div className={`bg-gradient-to-r ${specifications[activeSection].color} p-1 rounded-3xl mb-8 shadow-2xl`}>
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border border-gray-800">
                  <div className="grid lg:grid-cols-2 gap-12 items-start">
                    
                    {/* Left Side - Specifications */}
                    <div>
                      <motion.div 
                        className="flex items-center mb-8"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <motion.span 
                          className="text-5xl mr-4"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        >
                          {specifications[activeSection].icon}
                        </motion.span>
                        <h2 className="text-4xl md:text-5xl font-black text-white">
                          {specifications[activeSection].title}
                        </h2>
                      </motion.div>

                      <div className="space-y-4">
                        {specifications[activeSection].details.map((detail, index) => (
                          <motion.div
                            key={detail.label}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-xl p-5 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 backdrop-blur-sm"
                            whileHover={{ scale: 1.02, x: 5 }}
                          >
                            <div className="text-gray-400 text-sm mb-2 font-medium">{detail.label}</div>
                            <div className="text-white font-bold text-lg">{detail.value}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Right Side - Interactive Component */}
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="lg:pl-8"
                    >
                      {renderInteractiveComponent(specifications[activeSection])}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Enhanced Summary Section */}
      <section className="py-32 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),rgba(255,255,255,0))]" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
          >
            The most advanced iPhone ever
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-gray-300 mb-16 max-w-4xl mx-auto font-light leading-relaxed"
          >
            From the revolutionary A18 Pro chip to the groundbreaking Camera Control, 
            iPhone 16 Pro pushes the boundaries of what&apos;s possible in a smartphone.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg shadow-blue-500/25 border border-blue-500/30"
              whileHover={{ scale: 1.05, y: -3, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              Buy iPhone 16 Pro
            </motion.button>
            <motion.button
              className="px-10 py-4 border-2 border-white hover:bg-white hover:text-black rounded-2xl font-bold text-lg transition-all duration-300"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              Compare Models
            </motion.button>
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-20 opacity-20">
            <motion.div
              className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
          
          <div className="absolute bottom-20 right-20 opacity-20">
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full blur-xl"
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.2, 0.4]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            />
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-50"
        whileHover={{ scale: 1.1, rotate: 360 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </motion.button>
    </div>
  );
}