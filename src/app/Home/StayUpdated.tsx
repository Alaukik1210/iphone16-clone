'use client';
//@ts-nocheck
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { HiOutlineSignal } from "react-icons/hi2";
export default function StayUpdated() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    firstName:'',
    email:''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const validateEmail = (email:string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      firstName: '',
      email: ''
    };

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
      setFirstName('');
      setErrors({
        firstName: '',
        email: ''
      });
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'email') {
      setEmail(value);
      if (errors.email && validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    } else if (field === 'firstName') {
      setFirstName(value);
      if (errors.firstName && value.trim().length >= 2) {
        setErrors(prev => ({ ...prev, firstName: '' }));
      }
    }
  };

  return (
    <div className="min-h-screen font-poppins bg-gradient-to-br  from-black via-gray-900 to-gray-800 flex items-center justify-center p-6">
      
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 border border-white opacity-5 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-gray-400 opacity-5 rounded-lg"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-2xl p-8 shadow-2xl backdrop-blur-sm"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-gray-300 to-gray-500 rounded-2xl flex items-center justify-center"
                >
                  <HiOutlineSignal size={48} className="text-gray-400" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-3xl font-bold text-white mb-2"
                >
                  Stay Updated
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-gray-400"
                >
                  Get the latest iPhone 16 Pro news and exclusive offers
                </motion.p>
              </div>

              {/* Form */}
              <div className="space-y-6">
                {/* First Name Field */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="relative"
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      onFocus={() => setFocusedField('firstName')}
                      onBlur={() => setFocusedField('')}
                      className={`w-full px-4 py-4 bg-gray-800 border-2 rounded-xl text-white placeholder-gray-500 transition-all duration-300 focus:outline-none ${
                        errors.firstName
                          ? 'border-red-500 focus:border-red-400'
                          : focusedField === 'firstName'
                          ? 'border-white focus:border-gray-300'
                          : 'border-gray-600 focus:border-gray-400'
                      }`}
                      placeholder="Enter your first name"
                    />
                    <motion.div
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      animate={{
                        boxShadow: focusedField === 'firstName' 
                          ? '0 0 0 3px rgba(255, 255, 255, 0.1)' 
                          : '0 0 0 0px rgba(255, 255, 255, 0)'
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.firstName && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-400 text-sm mt-2"
                      >
                        {errors.firstName}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="relative"
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField('')}
                      className={`w-full px-4 py-4 bg-gray-800 border-2 rounded-xl text-white placeholder-gray-500 transition-all duration-300 focus:outline-none ${
                        errors.email
                          ? 'border-red-500 focus:border-red-400'
                          : focusedField === 'email'
                          ? 'border-white focus:border-gray-300'
                          : 'border-gray-600 focus:border-gray-400'
                      }`}
                      placeholder="Enter your email address"
                    />
                    <motion.div
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      animate={{
                        boxShadow: focusedField === 'email' 
                          ? '0 0 0 3px rgba(255, 255, 255, 0.1)' 
                          : '0 0 0 0px rgba(255, 255, 255, 0)'
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-400 text-sm mt-2"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  type="submit"
                  disabled={isLoading}
                  onClick={(e)=>handleSubmit(e)}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 disabled:opacity-50  cursor-pointer disabled:cursor-not-allowed relative overflow-hidden shadow-lg shadow-blue-500/25 border border-blue-500/30"
  whileHover={{ scale: isLoading ? 1 : 1.05, y: isLoading ? 0 : -3, boxShadow: isLoading ? undefined : "0 20px 40px #3B82F666" }}
  whileTap={{ scale: isLoading ? 1 : 0.95 }}
                >
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center space-x-2"
                      >
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Subscribing...</span>
                      </motion.div>
                    ) : (
                      <motion.span
                        key="text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Subscribe for Updates
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Terms */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  className="text-xs text-gray-500 text-center"
                >
                  By subscribing, you agree to receive marketing emails from Apple.
                  You can unsubscribe at any time.
                </motion.p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-green-900 to-green-800 border border-green-600 rounded-2xl p-8 shadow-2xl text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center"
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-2xl font-bold text-white mb-2"
              >
                Welcome aboard, {firstName}!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-green-200"
              >
                You&apos;re now subscribed to iPhone 16 Pro updates.
                Check your email for confirmation.
              </motion.p>

              <motion.div
                className="mt-6 text-sm text-green-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                Redirecting in 3 seconds...
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}