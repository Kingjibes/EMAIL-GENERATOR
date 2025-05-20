import React from 'react';
    import { motion } from 'framer-motion';
    import { Send, MessageCircle } from 'lucide-react';

    const ContactFooter = () => {
      return (
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="w-full max-w-2xl mt-12 mb-6 text-center text-purple-300"
        >
          <p className="text-sm">Contact Us:</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="https://wa.me/+233557488116" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-pink-400 transition-colors">
              <MessageCircle className="h-5 w-5 mr-1" /> WhatsApp
            </a>
            <a href="https://t.me/t.me/HACK_ERPRO" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-pink-400 transition-colors">
              <Send className="h-5 w-5 mr-1" /> Telegram
            </a>
          </div>
          <p className="text-xs mt-4 text-purple-400/70">&copy; {new Date().getFullYear()} CIPHERTECH. All rights reserved.</p>
        </motion.footer>
      );
    };

    export default ContactFooter;
