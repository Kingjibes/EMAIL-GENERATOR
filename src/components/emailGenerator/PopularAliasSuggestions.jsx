import React, { useEffect, useState } from 'react';
    import { motion } from 'framer-motion';
    import { supabase } from '@/lib/supabaseClient';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Zap, Tag } from 'lucide-react';

    const PopularAliasSuggestions = ({ onSelect, key: propKey }) => {
      const [suggestions, setSuggestions] = useState([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        const fetchSuggestions = async () => {
          setLoading(true);
          const { data, error } = await supabase
            .from('alias_usage_stats')
            .select('alias_fragment, usage_count')
            .order('usage_count', { ascending: false })
            .limit(10); // Fetch top 10

          if (error) {
            console.error('Error fetching popular alias suggestions:', error);
            setSuggestions([]);
          } else {
            setSuggestions(data);
          }
          setLoading(false);
        };
        fetchSuggestions();
      }, [propKey]); // Re-fetch when key changes

      if (loading) {
        return (
          <Card className="glassmorphism p-6 animate-pulse">
            <div className="h-6 bg-slate-700 rounded w-1/2 mb-4"></div>
            <div className="flex flex-wrap gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 bg-slate-700 rounded-full w-24"></div>
              ))}
            </div>
          </Card>
        );
      }

      if (suggestions.length === 0) {
        return (
          <Card className="glassmorphism">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-purple-300 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-purple-400" />
                    Popular Alias Suggestions
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-center text-purple-300">No popular suggestions available yet. Generate some emails to see trends!</p>
            </CardContent>
          </Card>
        );
      }

      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Card className="glassmorphism shadow-lg shadow-teal-500/20">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-teal-300 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-teal-400" />
                Trending Alias Fragments
              </CardTitle>
              <CardDescription className="text-teal-400">
                Quickly use popular alias fragments based on community usage. Click to copy a suggestion based on your current input.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSelect(suggestion.alias_fragment)}
                      className="bg-teal-800/40 border-teal-600/70 text-teal-200 hover:bg-teal-700/60 hover:text-teal-100 group"
                    >
                      <Tag className="w-4 h-4 mr-2 text-teal-400 group-hover:text-teal-300" />
                      {suggestion.alias_fragment}
                      <span className="ml-2 text-xs bg-teal-600/80 text-teal-100 px-1.5 py-0.5 rounded-full">{suggestion.usage_count}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default PopularAliasSuggestions;
