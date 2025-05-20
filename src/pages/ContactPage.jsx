import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, User, MessageSquare } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';


const ContactPage = () => {
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    console.log({ name, email, message });

    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
      variant: "default",
      className: "bg-green-600 text-white border-green-700",
    });
    e.target.reset();
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      <header className="text-center space-y-4">
        <motion.h1 
          className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Get In Touch
        </motion.h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="glassmorphism border-teal-500/30 shadow-xl shadow-teal-500/10">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <MessageSquare className="h-8 w-8 text-teal-400" />
                <CardTitle className="text-3xl font-semibold text-gray-100">Send us a Message</CardTitle>
              </div>
              <CardDescription className="text-gray-400">
                Fill out the form and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input name="name" type="text" placeholder="Your Name" required className="pl-10 bg-slate-800/50 border-gray-600 focus:border-teal-500 focus:ring-teal-500 text-gray-200" />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input name="email" type="email" placeholder="Your Email" required className="pl-10 bg-slate-800/50 border-gray-600 focus:border-teal-500 focus:ring-teal-500 text-gray-200" />
                </div>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                  <Textarea name="message" placeholder="Your Message" required rows={5} className="pl-10 bg-slate-800/50 border-gray-600 focus:border-teal-500 focus:ring-teal-500 text-gray-200" />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 text-lg">
                  Send Message <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card className="glassmorphism border-cyan-500/30 shadow-xl shadow-cyan-500/10">
            <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                    <Mail className="h-8 w-8 text-cyan-400" />
                    <CardTitle className="text-3xl font-semibold text-gray-100">Other Ways to Connect</CardTitle>
                </div>
              <CardDescription className="text-gray-400">
                Connect with us through your preferred channel.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-cyan-300 mb-2">WhatsApp</h3>
                <Button variant="outline" className="w-full border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white" onClick={() => window.open('https://wa.me/+233557488116')}>
                  <Phone className="mr-2 h-5 w-5" /> Chat on WhatsApp
                </Button>
                <p className="text-xs text-gray-500 mt-1 text-center"></p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-300 mb-2">Telegram</h3>
                <Button variant="outline" className="w-full border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white" onClick={() => window.open('https://t.me/HACK_ERPRO')}>
                  <Send className="mr-2 h-5 w-5" /> Message on Telegram
                </Button>
                <p className="text-xs text-gray-500 mt-1 text-center"></p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-300 mb-2">General Inquiries</h3>
                <p className="text-gray-300">
                  For other questions, you can email us at:
                  <a href="mailto:support@ciphertech.hackerpro" className="block text-cyan-400 hover:underline mt-1">
                    support@ciphertech.hackerpro
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-400">
          CIPHERTECH is a <strong className="text-teal-300">HACKERPRO</strong> initiative. We value your input.
        </p>
      </div>
    </motion.div>
  );
};

export default ContactPage;
