import React from 'react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <motion.header 
      className="w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-0 m-0"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-screen-xl mx-auto px-8 py-16">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img
                src="/headshot.jpg"
                alt="Spencer's headshot"
                className="w-24 h-24 rounded-full object-cover border-4 border-white/20 shadow-2xl hover:border-purple-400/50 transition-all duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-400/20 to-pink-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent hover:from-purple-300 hover:to-pink-300 transition-all duration-300">
                Hi, I'm Spencer
              </h1>
              <motion.div
                className="h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;