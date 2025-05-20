import React from 'react';
    import { motion } from 'framer-motion';

    const PageHeader = () => {
      return (
        <motion.header 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl mb-4 text-center"
        >
          <p className="text-sm text-purple-300 tracking-wider">Made by HACKERPRO</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-2">
            CIPHERTECH EMAIL GENERATOR
          </h1>
          <p className="mt-2 text-sm sm:text-md text-purple-200">
            There is no Gmail Generator Tool Working Except Our Tool. This Generate Gmail account With Receiving Emails on Inbox. You can use that email lifetime.
          </p>
        </motion.header>
      );
    };

    export default PageHeader;