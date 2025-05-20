import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';

const MainLayout = () => {
  const location = useLocation(); 
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 text-gray-100">
      <Navbar />
      <motion.main 
        key={location.pathname} 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8"
      >
        <Outlet />
      </motion.main>
      <footer className="py-6 text-center text-sm text-gray-400 border-t border-gray-700">
        <p>&copy; {new Date().getFullYear()} CIPHERTECH Email Generator. All rights reserved.</p>
        <p className="mt-1">A HACKERPRO Creation</p>
      </footer>
    </div>
  );
};

export default MainLayout;