import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
    import { Mail, Info, Send, Search } from 'lucide-react';

    const EmailInputForm = ({ email, setEmail, isLoading, onGenerate }) => {
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-2xl"
        >
          <Card className="glassmorphism shadow-2xl shadow-purple-500/30">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Mail className="w-16 h-16 text-purple-400" />
              </div>
              <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400">Generate Your Email Variations</CardTitle>
              <CardDescription className="text-purple-200 mt-2">
                Enter your primary Gmail address to generate 200+ variations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="e.g., yourname@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-800/50 border-purple-500/50 text-gray-100 placeholder-gray-400 focus:ring-pink-500 focus:border-pink-500 h-12 text-lg pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
              </div>
              <Button
                onClick={onGenerate}
                disabled={isLoading}
                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-t-2 border-b-2 border-white rounded-full"
                  ></motion.div>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" /> Generate Emails
                  </>
                )}
              </Button>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-3 bg-yellow-800/30 border border-yellow-600/50 rounded-md text-yellow-200 text-sm text-center flex items-center justify-center"
              >
                <Info className="h-5 w-5 mr-2 text-yellow-400" />
                This Tool Doesn’t Store Any Entry/Data/Gmail/Username
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default EmailInputForm;
