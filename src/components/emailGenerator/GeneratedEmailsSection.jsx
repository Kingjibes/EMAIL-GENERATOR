import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { ScrollArea } from '@/components/ui/scroll-area';
    import { Download, Copy } from 'lucide-react';

    const GeneratedEmailsSection = React.forwardRef(({ generatedEmails, onDownload, onCopy }, ref) => {
      return (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-2xl mt-8"
        >
          <Card className="glassmorphism shadow-2xl shadow-pink-500/30">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-400">Generated Emails ({generatedEmails.length})</CardTitle>
              <CardDescription className="text-purple-200">
                All these emails will forward to your main Gmail inbox.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-72 w-full rounded-md border border-purple-500/50 p-4 bg-slate-800/30">
                <ul className="space-y-2">
                  {generatedEmails.map((genEmail, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.02 }}
                      className="flex justify-between items-center p-2 bg-slate-700/40 rounded hover:bg-purple-600/30 transition-colors"
                    >
                      <span className="text-sm text-gray-200 break-all">{genEmail}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onCopy(genEmail)}
                        className="text-purple-300 hover:text-pink-400"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </motion.li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button
                onClick={onDownload}
                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <Download className="mr-2 h-5 w-5" /> Download List
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      );
    });
    GeneratedEmailsSection.displayName = "GeneratedEmailsSection";

    export default GeneratedEmailsSection;