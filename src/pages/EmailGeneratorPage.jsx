import React from 'react';
    import { motion } from 'framer-motion';
    import { useEmailGeneratorLogic } from '@/hooks/useEmailGeneratorLogic';
    import PageHeader from '@/components/emailGenerator/PageHeader';
    import EmailInputForm from '@/components/emailGenerator/EmailInputForm';
    import GeneratedEmailsSection from '@/components/emailGenerator/GeneratedEmailsSection';
    import HowToUseSection from '@/components/emailGenerator/HowToUseSection';
    import ContactFooter from '@/components/emailGenerator/ContactFooter';
    import AliasPersonaPacks from '@/components/emailGenerator/AliasPersonaPacks';
    import EmailUsageInsights from '@/components/emailGenerator/EmailUsageInsights';
    import PopularAliasSuggestions from '@/components/emailGenerator/PopularAliasSuggestions';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
    import { Sparkles, BarChart2, Users, Info } from 'lucide-react';

    const EmailGeneratorPage = () => {
      const {
        email,
        setEmail,
        generatedEmails,
        isLoading,
        isDownloading,
        generatedEmailsRef,
        insightsKey,
        handleGenerateEmails,
        downloadEmails,
        copyToClipboard,
        handleAliasFragmentSelect,
      } = useEmailGeneratorLogic();

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
                    Persona Packs offer curated alias suggestions for common scenarios like "Online Shopping" or "Social Media." Enter your base email above, then click "Use" on a suggestion from a pack. The tool will copy a ready-to-use alias (e.g., <code className="text-pink-300 bg-slate-700/50 px-1 rounded">yourname.packfragment@gmail.com</code>) to your clipboard.
                  </p>
                </div>
                <AliasPersonaPacks onSelect={handleAliasFragmentSelect} />
              </TabsContent>
              <TabsContent value="popular-suggestions" className="mt-4">
                <div className="p-4 rounded-lg bg-slate-800/50 border border-purple-700/30 mb-4">
                  <div className="flex items-center text-purple-300 mb-2">
                    <Info className="w-5 h-5 mr-2 text-purple-400" />
                    <h3 className="text-lg font-semibold">How to Use Popular Suggestions</h3>
                  </div>
                  <p className="text-sm text-purple-400">
                    See which alias fragments (like "newsletter" or "social") are trending in our community. Enter your base email first, then click any suggestion. A complete alias using that fragment (e.g., <code className="text-pink-300 bg-slate-700/50 px-1 rounded">yourname.popularfragment@gmail.com</code>) will be copied to your clipboard.
                  </p>
                </div>
                <PopularAliasSuggestions key={`popular-${insightsKey}`} onSelect={handleAliasFragmentSelect} />
              </TabsContent>
            </Tabs>
          </motion.div>
          
          <HowToUseSection />
          <ContactFooter />
        </div>
      );
    };

    export default EmailGeneratorPage;
