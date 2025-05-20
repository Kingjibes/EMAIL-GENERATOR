import React, { useState, useRef } from 'react';
    import { motion } from 'framer-motion';
    import { useToast } from '@/components/ui/use-toast';
    import { supabase } from '@/lib/supabaseClient';
    import PageHeader from '@/components/emailGenerator/PageHeader';
    import EmailInputForm from '@/components/emailGenerator/EmailInputForm';
    import GeneratedEmailsSection from '@/components/emailGenerator/GeneratedEmailsSection';
    import HowToUseSection from '@/components/emailGenerator/HowToUseSection';
    import ContactFooter from '@/components/emailGenerator/ContactFooter';
    import { generateEmailVariations } from '@/lib/emailUtils';

    const EmailGeneratorPage = () => {
      const [email, setEmail] = useState('');
      const [generatedEmails, setGeneratedEmails] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
      const { toast } = useToast();
      const generatedEmailsRef = useRef(null);

      const isValidGmail = (email) => {
        return /^[a-zA-Z0-9.]+@gmail\.com$/.test(email);
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

        try {
          const { data, error } = await supabase
            .from('generation_requests')
            .insert([{ original_email: email, user_agent: navigator.userAgent }]);
          
          if (error) {
            console.error('Error logging request to Supabase:', error);
            toast({
              title: 'Logging Error',
              description: 'Could not log the request. Please try again.',
              variant: 'destructive',
            });
          }
        } catch (e) {
            console.error('Unexpected error during Supabase insert:', e);
             toast({
              title: 'Unexpected Error',
              description: 'An unexpected error occurred while logging.',
              variant: 'destructive',
            });
        }


        const variations = generateEmailVariations(email);
        
        setTimeout(() => {
          setGeneratedEmails(Array.from(variations).slice(0,105));
          setIsLoading(false);
          toast({
            title: 'Emails Generated!',
            description: `${variations.size > 100 ? '100+' : variations.size} email variations have been created.`,
          });
          if (generatedEmailsRef.current) {
            generatedEmailsRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }, 1500);
      };

      const downloadEmails = () => {
        if (generatedEmails.length === 0) {
          toast({
            title: 'No Emails to Download',
            description: 'Please generate emails first.',
            variant: 'destructive',
          });
          return;
        }
        const fileContent = generatedEmails.join('\n');
        const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'ciphertech_generated_emails.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast({
          title: 'Download Started',
          description: 'Your email list is being downloaded.',
        });
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
            />
          )}

          <HowToUseSection />
          <ContactFooter />
        </div>
      );
    };

    export default EmailGeneratorPage;