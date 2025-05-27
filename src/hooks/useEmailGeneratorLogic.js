import { useState, useRef } from 'react';
    import { useToast } from '@/components/ui/use-toast';
    import { supabase } from '@/lib/supabaseClient';
    import { generateEmailVariations } from '@/lib/emailUtils';

    export const useEmailGeneratorLogic = () => {
      const [email, setEmail] = useState('');
      const [generatedEmails, setGeneratedEmails] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
      const [isDownloading, setIsDownloading] = useState(false);
      const { toast } = useToast();
      const generatedEmailsRef = useRef(null);
      const [insightsKey, setInsightsKey] = useState(0);

      const isValidGmail = (value) => {
        return /^[a-zA-Z0-9._+-]+@gmail\.com$/.test(value);
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
          await supabase
            .from('generation_requests')
            .insert([{ original_email: email, user_agent: navigator.userAgent, base_email: baseEmailForLog }]);
        } catch (e) {
          console.error('Error logging request to Supabase:', e);
        }

        const variations = generateEmailVariations(email);
        const variationsArray = Array.from(variations).slice(0, 205);
        
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

          try {
            const { error: statsError } = await supabase.functions.invoke('log_alias_generation_and_update_stats', {
              body: { original_email: email, generated_aliases: variationsArray },
            });
            if (statsError) {
              console.error('Error updating alias stats via Edge Function:', statsError);
            } else {
              setInsightsKey(prevKey => prevKey + 1);
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

          if (counterError) throw new Error(counterError.message);
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
        }).catch(() => {
          toast({
            title: 'Copy Failed',
            description: 'Could not copy to clipboard.',
            variant: 'destructive',
          });
        });
      };
      
      const handleAliasFragmentSelect = (fragment) => {
        if (email && isValidGmail(email)) {
            const [username, domain] = email.split('@');
            if (username && domain) {
                // Ensure fragment doesn't start with a dot if it's already clean
                const cleanFragment = fragment.startsWith('.') ? fragment.substring(1) : fragment;
                const suggestedEmail = `${username}.${cleanFragment}@${domain}`;
                copyToClipboard(suggestedEmail);
                toast({
                    title: 'Alias Copied!',
                    description: `${suggestedEmail} (based on your current input) copied. Paste it where needed.`,
                });
            } else { // Should not happen if isValidGmail passed
                 toast({
                    title: 'Error Processing Email',
                    description: 'Could not properly parse your base email.',
                    variant: 'destructive',
                });
            }
        } else {
            toast({
                title: 'Enter Base Email First',
                description: 'Please enter your valid Gmail address above to use this feature.',
                variant: 'destructive',
            });
        }
      };

      return {
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
      };
    };
