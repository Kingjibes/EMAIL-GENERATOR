import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { HelpCircle, MessageSquare, LifeBuoy, FileText, Phone, Send } from 'lucide-react';

const SupportPage = () => {
  const faqItems = [
    {
      question: "How does the email generation work?",
      answer: "The generator creates variations of your Gmail address by adding '+' symbols or dots. For example, if your email is 'user@gmail.com', it can generate 'user+work@gmail.com' or 'u.ser@gmail.com'. Emails sent to these variations will still arrive in your 'user@gmail.com' inbox."
    },
    {
      question: "Are the generated emails permanent?",
      answer: "Yes, as long as Gmail supports the '+' aliasing and dot convention, these email addresses will work and forward to your main inbox. This tool doesn't create new Gmail accounts, only aliases."
    },
    {
      question: "Is my data safe? Do you store my email?",
      answer: "We prioritize your privacy. This tool DOES NOT STORE any entry, data, Gmail address, or username. All processing is done in your browser."
    },
    {
      question: "Can I use these emails for any website or service?",
      answer: "Most websites and services accept emails with '+' symbols. However, some may have stricter validation rules. Compatibility depends on the specific service's policies."
    },
    {
      question: "How do I download the list of generated emails?",
      answer: "After generating emails, a 'Download Emails' button will appear. Click it to save a .txt file containing all the generated email addresses to your device."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      <header className="text-center space-y-4">
        <motion.h1 
          className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Support Center
        </motion.h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Need help? Find answers to common questions and learn how to get the most out of CIPHERTECH Email Generator.
        </p>
      </header>

      <section className="space-y-6">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <HelpCircle className="h-8 w-8 text-sky-400" />
          <h2 className="text-4xl font-bold text-center text-gray-100">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index + 0.3, duration: 0.5 }}
            >
              <Card className="glassmorphism border-gray-700 hover:border-sky-500/50 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-sky-300">{item.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{item.answer}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-center justify-center space-x-2">
          <LifeBuoy className="h-8 w-8 text-green-400" />
          <h2 className="text-4xl font-bold text-center text-gray-100">Contact Support</h2>
        </div>
        <p className="text-lg text-gray-300 text-center max-w-2xl mx-auto">
          If you can't find an answer in our FAQ, or if you have specific issues or feedback, please reach out to us. We're here to help!
        </p>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.5 }}>
            <Card className="h-full glassmorphism border-green-500/30 shadow-lg shadow-green-500/10">
              <CardHeader className="items-center text-center">
                <Phone className="h-10 w-10 text-green-400 mb-2" />
                <CardTitle className="text-2xl font-semibold text-gray-100">WhatsApp</CardTitle>
                <CardDescription className="text-gray-400">For quick chats & support</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white w-full" onClick={() => window.open('https://wa.me/+233557488116')}>
                  Chat on WhatsApp
                </Button>
                <p className="text-xs text-gray-500 mt-2"></p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
            <Card className="h-full glassmorphism border-blue-500/30 shadow-lg shadow-blue-500/10">
              <CardHeader className="items-center text-center">
                <Send className="h-10 w-10 text-blue-400 mb-2" />
                <CardTitle className="text-2xl font-semibold text-gray-100">Telegram</CardTitle>
                <CardDescription className="text-gray-400">Connect with us on Telegram</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white w-full" onClick={() => window.open('https://t.me/HACK_ERPRO')}>
                  Message on Telegram
                </Button>
                 <p className="text-xs text-gray-500 mt-2"></p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <div className="text-center mt-12">
        <p className="text-gray-400">
          Support by <strong className="text-sky-300">HACKERPRO</strong> - We're committed to your success.
        </p>
      </div>
    </motion.div>
  );
};

export default SupportPage;
