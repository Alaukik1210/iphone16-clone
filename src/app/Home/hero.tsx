"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MdMenu } from "react-icons/md";
import { SlUser } from "react-icons/sl";
import img1 from "@/assets/iphone-black.webp";
import img2 from "@/assets/iphone-yellow.webp";
import img3 from "@/assets/iphone-pink.webp";
import logo from "@/assets/logo.png";
import { UpdateFollower } from "react-mouse-follower";

const NavbarMenu = [
  { id: 1, title: "Home", link: "#" },
  { id: 2, title: "About", link: "#" },
  { id: 3, title: "Services", link: "#" },
  { id: 4, title: "Contact", link: "#" },
];

const Hero = () => {
  const [currentModel, setCurrentModel] = useState(0);

  const Models = [
    {
      id: 0,
      name: "iPhone 16 Pro",
      model: "A3101",
      price: 1199,
      originalPrice: 1399,
      color: "#ffffff",
      accentColor: "#cccccc",
      features: ["A18 Bionic", "ProMotion Display", "Triple Camera"],
      image: img1, // black
    },
    {
      id: 1,
      name: "iPhone 16",
      model: "A3102",
      price: 999,
      originalPrice: 1199,
      color: "#FFD070",
      accentColor: "#BFA48D",
      features: ["A18 Chip", "Super Retina XDR", "Dual Camera"],
      image: img2, // yellow
    },
    {
      id: 2,
      name: "iPhone 16 Mini",
      model: "A3103",
      price: 899,
      originalPrice: 1099,
      color: "#F2ADDA",
      accentColor: "#F2ADDA",
      features: ["Compact Size", "A17 Chip", "Wireless Charging"],
      image: img3, // pink
    },
  ];

  const currentProduct = Models[currentModel];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentModel((prev) => (prev + 1) % Models.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen font-poppins bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[length:50px_50px]"></div>
      </div>
      <motion.nav
        className="relative z-10 container mx-auto flex justify-between items-center py-8 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Logo */}
        <div>
          <motion.img
            src={logo.src}
            alt="Logo"
            className="h-16 sm:h-20 object-contain"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:block">
          <ul className="flex items-center gap-4">
            {NavbarMenu.map((item) => (
              <li key={item.id}>
                <UpdateFollower
                  mouseOptions={{
                    backgroundColor: "white",
                    zIndex: 999,
                    followSpeed: 1.5,
                    scale: 5,
                    mixBlendMode: "difference",
                  }}
                >
                  <a
                    href={item.link}
                    className="inline-block text-sm py-2 px-3 uppercase"
                  >
                    {item.title}
                  </a>
                </UpdateFollower>
              </li>
            ))}

            
            <UpdateFollower
              mouseOptions={{
                backgroundColor: "white",
                zIndex: 999,
                followSpeed: 1.5,
                scale: 5,
                mixBlendMode: "difference",
              }}
            >
              <button className="text-xl ps-14 cursor-pointer">
                <SlUser />
              </button>
            </UpdateFollower>
          </ul>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-2xl">
          <MdMenu />
        </div>
      </motion.nav>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            className="space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            ></motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Say hello to
                <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  iPhone.
                </span>
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl font-poppins text-gray-400 max-w-lg mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Get iPhone 16 Pro from just ₹9825.00/mo. for up to 12 months
                with No Cost EMI and instant cashback.
              </motion.p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentModel}
                className="space-y-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
                  <div>
                    <h3 className="text-2xl font-bold">
                      {currentProduct.name}
                    </h3>
                    <p className="text-gray-400">{currentProduct.model}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-blue-400">
                      ${currentProduct.price}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ${currentProduct.originalPrice}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                  {currentProduct.features.map((feature, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-gray-600 text-gray-300"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                Buy Now
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentModel}
                  className="relative z-10"
                  initial={{ opacity: 0, rotateY: 90 }}
                  animate={{
                    opacity: 1,
                    rotateY: 0,
                    rotateX: [0, 5, 0],
                    rotateZ: [0, -2, 0, 2, 0],
                  }}
                  exit={{ opacity: 0, rotateY: -90 }}
                  transition={{
                    opacity: { duration: 0.5 },
                    rotateY: { duration: 0.8 },
                    rotateX: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    rotateZ: {
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <div className="w-80 h-80 lg:w-96 lg:h-96 relative mx-auto flex items-center justify-center">
                    <motion.img
                      src={currentProduct.image.src}
                      alt={currentProduct.name}
                      className="w-full h-full object-contain"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: [0, -2, 0, 2, 0] }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              <motion.div
                className="absolute inset-0 rounded-full blur-3xl scale-150 -z-10"
                animate={{
                  background: [
                    `radial-gradient(circle, ${currentProduct.accentColor}50, transparent)`,
                    `radial-gradient(circle, ${currentProduct.accentColor}50, transparent)`,
                    `radial-gradient(circle, ${currentProduct.accentColor}50, transparent)`,
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
                  style={{
                    left: `${20 + i * 10}%`,
                    top: `${30 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.6, 1, 0.6],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {Models.map((model, index) => (
                <motion.button
                  key={model.id}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentModel === index
                      ? "scale-125"
                      : "scale-100 opacity-50"
                  }`}
                  style={{
                    backgroundColor:
                      currentModel === index ? model.accentColor : "#666",
                  }}
                  onClick={() => setCurrentModel(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <span className="text-sm mb-2">Scroll to explore</span>
        <motion.div
          className="w-0.5 h-8 bg-gray-400"
          animate={{ height: [32, 16, 32] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
};

export default Hero;
