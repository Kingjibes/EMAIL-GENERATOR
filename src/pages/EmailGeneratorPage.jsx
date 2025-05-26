
    import React, { useState, useRef, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { useToast } from '@/components/ui/use-toast';
    import { supabase } from '@/lib/supabaseClient';
    import PageHeader from '@/components/emailGenerator/PageHeader';
    import EmailInputForm from '@/components/emailGenerator/EmailInputForm';
    import GeneratedEmailsSection from '@/components/emailGenerator/GeneratedEmailsSection';
    import HowToUseSection from '@/components/emailGenerator/HowToUseSection';
    import ContactFooter from '@/components/emailGenerator/ContactFooter';
    import AliasPersonaPacks from '@/components/emailGenerator/AliasPersonaPacks';
    import EmailUsageInsights from '@/components/emailGenerator/EmailUsageInsights';
    import PopularAliasSuggestions from '@/components/emailGenerator/PopularAliasSuggestions';
    import { generateEmailVariations } from '@/lib/emailUtils';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
    import { Sparkles, BarChart2, Users, Info } from 'lucide-react';

    const EmailGeneratorPage = () => {
      const [email, setEmail] = useState('');
      const [generatedEmails, setGeneratedEmails] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
      const [isDownloading, setIsDownloading] = useState(false);
      const { toast } = useToast();
      const generatedEmailsRef = useRef(null);
      const [insightsKey, setInsightsKey] = useState(0); // Used to force re-fetch of insights

      const isValidGmail = (email) => {
        return /^[a-zA-Z0-9._+-]+@gmail\.com$/.test(email);
      };

      const handleGenerateEmails = async () => {
        if (!email) {
          toast({
            title: 'Input Required',
            description: 'Please enter your Gmail address.',
            variant: 'destructive',
          });
          return;
        }

        if (!isValidGmail(email)) {
          toast({
            title: 'Invalid Gmail Address',
            description: 'Please enter a valid Gmail address (e.g., username@gmail.com).',
            variant: 'destructive',
          });
          return;
        }

        setIsLoading(true);
        setGeneratedEmails([]);
        const baseEmailForLog = email.split('@')[0];

        try {
          const { data: requestLogData, error: requestLogError } = await supabase
            .from('generation_requests')
            .insert([{ original_email: email, user_agent: navigator.userAgent, base_email: baseEmailForLog }]);
          
          if (requestLogError) {
            console.error('Error logging request to Supabase:', requestLogError);
          }
        } catch (e) {
            console.error('Unexpected error during Supabase request insert:', e);
        }

        const variations = generateEmailVariations(email);
        const variationsArray = Array.from(variations).slice(0,205);
        
        setTimeout(async () => {
          setGeneratedEmails(variationsArray);
          setIsLoading(false);
          toast({
            title: 'Emails Generated!',
            description: `${variations.size > 200 ? '200+' : variations.size} email variations have been created.`,
          });
          if (generatedEmailsRef.current) {
            generatedEmailsRef.current.scrollIntoView({ behavior: 'smooth' });
          }

          // Log alias generation and update stats
          try {
            const { error: statsError } = await supabase.functions.invoke('log_alias_generation_and_update_stats', {
              body: { original_email: email, generated_aliases: variationsArray },
            });
            if (statsError) {
              console.error('Error updating alias stats via Edge Function:', statsError);
            } else {
              setInsightsKey(prevKey => prevKey + 1); // Trigger re-fetch for insights
            }
          } catch (e) {
            console.error('Error invoking Edge Function for stats:', e);
          }

        }, 1500);
      };

      const formatCounter = (count) => {
        return count.toString().padStart(3, '0');
      };

      const downloadEmails = async () => {
        if (generatedEmails.length === 0) {
          toast({
            title: 'No Emails to Download',
            description: 'Please generate emails first.',
            variant: 'destructive',
          });
          return;
        }
        setIsDownloading(true);
        try {
          const { data: counterResponse, error: counterError } = await supabase.functions.invoke('get_and_increment_download_counter');

          if (counterError) {
            throw new Error(counterError.message);
          }

          if (!counterResponse || typeof counterResponse.new_counter_value === 'undefined') {
             throw new Error('Invalid counter response from server.');
          }
          
          const counterValue = counterResponse.new_counter_value;
          const fileName = `cipher_email${formatCounter(counterValue)}.txt`;
          
          const fileContent = generatedEmails.join('\n');
          const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8;' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          toast({
            title: 'Download Started',
            description: `Your email list is being downloaded as ${fileName}.`,
          });

        } catch (error) {
          console.error('Error during download process:', error);
          toast({
            title: 'Download Failed',
            description: error.message || 'Could not get download counter or create file.',
            variant: 'destructive',
          });
        } finally {
          setIsDownloading(false);
        }
      };

      const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
          toast({
            title: 'Copied!',
            description: `${text} copied to clipboard.`,
          });
        }).catch(err => {
          toast({
            title: 'Copy Failed',
            description: 'Could not copy to clipboard.',
            variant: 'destructive',
          });
        });
      };
      
      const handlePersonaPackSelect = (aliasFragment) => {
        if (email) {
            const [username, domain] = email.split('@');
            if (username && domain) {
                const suggestedEmail = `${username}${aliasFragment}@${domain}`;
                copyToClipboard(suggestedEmail);
                toast({
                    title: 'Persona Alias Copied!',
                    description: `${suggestedEmail} (based on your current input) copied. Paste it where needed or generate a full list.`,
                });
            } else {
                 toast({
                    title: 'Enter Base Email First',
                    description: 'Please enter your primary email above to use persona packs effectively.',
                    variant: 'destructive',
                });
            }
        } else {
            toast({
                title: 'Enter Base Email First',
                description: 'Please enter your primary email above to use persona packs effectively.',
                variant: 'destructive',
            });
        }
      };


      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100 p-4 sm:p-8 flex flex-col items-center">
          <PageHeader />
          
          <EmailInputForm
            email={email}
            setEmail={setEmail}
            isLoading={isLoading}
            onGenerate={handleGenerateEmails}
          />

          {generatedEmails.length > 0 && (
            <GeneratedEmailsSection
              ref={generatedEmailsRef}
              generatedEmails={generatedEmails}
              onDownload={downloadEmails}
              onCopy={copyToClipboard}
              isDownloading={isDownloading}
            />
          )}

          <motion.div 
            className="w-full max-w-4xl mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Tabs defaultValue="insights" className="w-full">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 bg-purple-800/30 border-purple-700/50 h-auto md:h-10">
                <TabsTrigger value="insights" className="text-purple-300 data-[state=active]:bg-purple-600/50 data-[state=active]:text-white py-2.5 md:py-1.5">
                  <BarChart2 className="w-4 h-4 mr-2" /> Usage Insights
                </TabsTrigger>
                <TabsTrigger value="persona-packs" className="text-purple-300 data-[state=active]:bg-purple-600/50 data-[state=active]:text-white py-2.5 md:py-1.5">
                  <Users className="w-4 h-4 mr-2" /> Alias Persona Packs
                </TabsTrigger>
                <TabsTrigger value="popular-suggestions" className="text-purple-300 data-[state=active]:bg-purple-600/50 data-[state=active]:text-white py-2.5 md:py-1.5">
                  <Sparkles className="w-4 h-4 mr-2" /> Popular Suggestions
                </TabsTrigger>
              </TabsList>
              <TabsContent value="insights" className="mt-4">
                <div className="p-4 rounded-lg bg-slate-800/50 border border-purple-700/30 mb-4">
                  <div className="flex items-center text-purple-300 mb-2">
                    <Info className="w-5 h-5 mr-2 text-purple-400" />
                    <h3 className="text-lg font-semibold">About Usage Insights</h3>
                  </div>
                  <p className="text-sm text-purple-400">
                    Discover how our community uses email aliases. This section shows the total number of emails generated and highlights the most frequently used alias fragments, giving you an idea of popular trends.
                  </p>
                </div>
                <EmailUsageInsights key={`insights-${insightsKey}`} />
              </TabsContent>
              <TabsContent value="persona-packs" className="mt-4">
                <div className="p-4 rounded-lg bg-slate-800/50 border border-purple-700/30 mb-4">
                  <div className="flex items-center text-purple-300 mb-2">
                    <Info className="w-5 h-5 mr-2 text-purple-400" />
                    <h3 className="text-lg font-semibold">How to Use Persona Packs</h3>
                  </div>
                  <p className="text-sm text-purple-400">
                    Persona Packs offer curated alias suggestions for common scenarios like "Online Shopping" or "Social Media." Enter your base email above, then click "Use" on a suggestion from a pack. The tool will copy a ready-to-use alias (e.g., <code className="text-pink-300 bg-slate-700/50 px-1 rounded">yourname+packfragment@gmail.com</code>) to your clipboard.
                  </p>
                </div>
                <AliasPersonaPacks onSelect={handlePersonaPackSelect} />
              </TabsContent>
              <TabsContent value="popular-suggestions" className="mt-4">
                <div className="p-4 rounded-lg bg-slate-800/50 border border-purple-700/30 mb-4">
                  <div className="flex items-center text-purple-300 mb-2">
                    <Info className="w-5 h-5 mr-2 text-purple-400" />
                    <h3 className="text-lg font-semibold">How to Use Popular Suggestions</h3>
                  </div>
                  <p className="text-sm text-purple-400">
                    See which alias fragments (like "+newsletter" or "+social") are trending in our community. Enter your base email first, then click any suggestion. A complete alias using that fragment (e.g., <code className="text-pink-300 bg-slate-700/50 px-1 rounded">yourname+popularfragment@gmail.com</code>) will be copied to your clipboard.
                  </p>
                </div>
                <PopularAliasSuggestions key={`popular-${insightsKey}`} onSelect={handlePersonaPackSelect} />
              </TabsContent>
            </Tabs>
          </motion.div>
          
          <HowToUseSection />
          <ContactFooter />
        </div>
      );
    };

    export default EmailGeneratorPage;
  
