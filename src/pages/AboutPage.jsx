import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Info, Users, Target, Zap } from 'lucide-react';

const AboutPage = () => {
  const features = [
    {
      icon: <Zap className="h-10 w-10 text-purple-400" />,
      title: "Instant Email Variants",
      description: "Generate hundreds of email variations linked to your primary Gmail account in seconds. Perfect for segmenting sign-ups, tracking sources, or enhancing privacy.",
    },
    {
      icon: <Target className="h-10 w-10 text-green-400" />,
      title: "Centralized Inbox",
      description: "All emails sent to generated variants land directly in your main Gmail inbox. No need to manage multiple accounts.",
    },
    {
      icon: <Users className="h-10 w-10 text-blue-400" />,
      title: "User-Focused Design",
      description: "An intuitive and visually appealing interface makes email generation straightforward and enjoyable for everyone.",
    },
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
          className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          About CIPHERTECH Email Generator
        </motion.h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Revolutionizing how you manage your email communications with speed, privacy, and unparalleled convenience.
        </p>
      </header>

      <Card className="glassmorphism border-purple-500/30 shadow-2xl shadow-purple-500/10">
        <CardHeader>
          <div className="flex items-center space-x-3 mb-2">
            <Info className="h-8 w-8 text-purple-400" />
            <CardTitle className="text-3xl font-semibold text-gray-100">Our Mission</CardTitle>
          </div>
          <CardDescription className="text-gray-400 text-lg">
            At CIPHERTECH, we empower users by providing innovative tools that simplify digital life. Our Email Generator is designed to give you control over your inbox, enhance your online privacy, and streamline your digital identity management. We believe in smart solutions that are both powerful and easy to use.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 leading-relaxed">
            Built by HACKERPRO, this tool leverages common Gmail alias functionalities (like using `+` or `.` in usernames) to create a multitude of disposable yet functional email addresses. While we strive to ensure compatibility, the effectiveness of these aliases ultimately depends on Gmail's policies and the policies of services where these emails are used. 
            <br/><br/>
            <strong className="text-purple-300">Important:</strong> This tool does not store any of your personal data, email addresses, or generated lists. Your privacy is paramount.
          </p>
        </CardContent>
      </Card>

      <section className="space-y-6">
        <h2 className="text-4xl font-bold text-center text-gray-100">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index + 0.4, duration: 0.5 }}
            >
              <Card className="h-full glassmorphism border-gray-700 hover:border-purple-500/50 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                <CardHeader className="items-center text-center">
                  {feature.icon}
                  <CardTitle className="mt-4 text-2xl font-semibold text-gray-100">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="text-center mt-12">
        <p className="text-gray-400">
          CIPHERTECH Email Generator - A proud creation by <strong className="text-purple-300">HACKERPRO</strong>.
        </p>
      </div>
    </motion.div>
  );
};

export default AboutPage;