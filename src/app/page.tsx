"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "./Home/hero";
import IPhoneShowcase from "./Home/IPhoneModel";
import PageLoader from "@/components/PageLoader";
import Interactive from "./Home/Inveractive";
import StayUpdated from "./Home/StayUpdated";
import Features from "./Home/Features";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-screen">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <PageLoader />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Hero />
            <IPhoneShowcase />
            <Interactive />
            <Features />
            <StayUpdated />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
