import React from 'react';
    import { motion } from 'framer-motion';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { AlertTriangle } from 'lucide-react';

    const HowToUseSection = () => {
      return (
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full max-w-2xl mt-12 text-gray-300"
        >
          <Card className="glassmorphism shadow-lg shadow-purple-500/20">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-purple-300">How to Use & Save</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold text-purple-400 text-lg mb-1">How to Use:</h3>
                <ol className="list-decimal list-inside space-y-1 pl-2">
                  <li>Enter your primary Gmail address (e.g., <code className="bg-slate-700/50 px-1 rounded text-pink-300">yourname@gmail.com</code>) in the input field.</li>
                  <li>Click the "Generate Emails" button.</li>
                  <li>A list of 200+ email variations will be generated.</li>
                  <li>These generated emails are aliases of your primary Gmail. Any email sent to these variations will arrive in your main Gmail inbox.</li>
                  <li>Use these variations for different services (newsletters, sign-ups, etc.) to organize your inbox and track sources.</li>
                </ol>
              </div>
              <div>
                <h3 className="font-semibold text-purple-400 text-lg mb-1">How to Save:</h3>
                <ol className="list-decimal list-inside space-y-1 pl-2">
                  <li>Once emails are generated, a "Download List" button will appear.</li>
                  <li>Click this button to download a <code className="bg-slate-700/50 px-1 rounded text-pink-300">.txt</code> file containing all generated email addresses.</li>
                  <li>You can also copy individual emails by clicking the copy icon next to each one.</li>
                </ol>
              </div>
              <div className="pt-2">
                <p className="font-semibold text-purple-400 text-lg mb-1">Important Note on Gmail's Policies:</p>
                <p className="text-sm">
                    This tool utilizes Gmail's features that allow for variations in email addresses (using "+" and "." symbols). While these are standard Gmail functionalities, Gmail's policies can change. This tool generates valid alias formats, but continuous, error-free operation depends on Gmail maintaining these features. We are not responsible for any changes in Gmail's service that may affect the functionality of these generated aliases.
                </p>
              </div>

              <div className="mt-6 p-4 bg-orange-900/40 border border-orange-700/60 rounded-lg shadow-md">
                <div className="flex items-start">
                  <AlertTriangle className="h-6 w-6 mr-3 text-orange-400 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-orange-300 text-lg mb-1">Very Important Notice: Using Generated Emails with Render</h4>
                    <p className="text-orange-200 text-sm">
                      When using a generated email to create or register an account on <strong className="text-orange-100">Render.com</strong>:
                    </p>
                    <ul className="list-disc list-inside space-y-1 mt-2 text-orange-200 pl-2">
                      <li>If Render does not immediately prompt you to verify your email, or if you encounter issues with verification:</li>
                      <li className="ml-4">
                        <strong className="text-orange-100">Refresh the page</strong> on Render.com and try the verification process again.
                      </li>
                      <li className="ml-4">
                        You may need to <strong className="text-orange-100">repeat this process</strong> (refresh and retry) a few times.
                      </li>
                      <li>Persistence is key! The verification should eventually work.</li>
                    </ul>
                    <p className="text-xs text-orange-300/70 mt-2">
                      This specific behavior is related to how Render might handle email verification processes for aliased emails.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      );
    };

    export default HowToUseSection;
