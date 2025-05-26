import React, { useEffect, useState } from 'react';
    import { motion } from 'framer-motion';
    import { supabase } from '@/lib/supabaseClient';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { TrendingUp, Users, Mail, BarChartHorizontalBig } from 'lucide-react';

    const EmailUsageInsights = ({ key: propKey }) => {
      const [insights, setInsights] = useState({
        totalGenerations: 0,
        totalDownloads: 0,
        popularFragments: [],
      });
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        const fetchInsights = async () => {
          setLoading(true);
          try {
            const { count: generationCount, error: genError } = await supabase
              .from('generation_requests')
              .select('*', { count: 'exact', head: true });

            const { data: downloadCounterData, error: downloadError } = await supabase
              .from('download_counters')
              .select('current_value')
              .limit(1)
              .single();
            
            const { data: popularFragsData, error: fragsError } = await supabase
              .from('alias_usage_stats')
              .select('alias_fragment, usage_count')
              .order('usage_count', { ascending: false })
              .limit(5);

            if (genError) console.error('Error fetching generation count:', genError);
            if (downloadError) console.error('Error fetching download count:', downloadError);
            if (fragsError) console.error('Error fetching popular fragments:', fragsError);
            
            setInsights({
              totalGenerations: generationCount || 0,
              totalDownloads: downloadCounterData?.current_value || 0,
              popularFragments: popularFragsData || [],
            });

          } catch (error) {
            console.error("Error fetching insights:", error);
            setInsights({ totalGenerations: 0, totalDownloads: 0, popularFragments: [] });
          } finally {
            setLoading(false);
          }
        };

        fetchInsights();
      }, [propKey]); // Re-fetch when key changes

      if (loading) {
        return (
          <Card className="glassmorphism p-6 animate-pulse">
            <div className="h-6 bg-slate-700 rounded w-1/2 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-20 bg-slate-700 rounded"></div>
              <div className="h-20 bg-slate-700 rounded"></div>
            </div>
            <div className="mt-6">
              <div className="h-5 bg-slate-700 rounded w-1/3 mb-3"></div>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-4 bg-slate-700 rounded w-full mb-2"></div>
              ))}
            </div>
          </Card>
        );
      }

      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Card className="glassmorphism shadow-lg shadow-purple-500/20">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-purple-300 flex items-center">
                <BarChartHorizontalBig className="w-6 h-6 mr-2 text-purple-400" />
                Email Generation Insights
              </CardTitle>
              <CardDescription className="text-purple-400">
                Overview of email generation activity on the platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }}>
                  <Card className="bg-slate-800/50 border-purple-700/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-purple-300">Total Emails Generated</CardTitle>
                      <Mail className="h-5 w-5 text-purple-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-pink-400">{insights.totalGenerations.toLocaleString()}</div>
                      <p className="text-xs text-purple-400">Total generation requests made.</p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}>
                  <Card className="bg-slate-800/50 border-purple-700/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-purple-300">Total Lists Downloaded</CardTitle>
                      <Users className="h-5 w-5 text-purple-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-pink-400">{insights.totalDownloads.toLocaleString()}</div>
                      <p className="text-xs text-purple-400">Unique download filenames issued.</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {insights.popularFragments.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                  <h3 className="text-lg font-semibold text-purple-300 mb-2 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
                    Most Popular Alias Fragments
                  </h3>
                  <ul className="space-y-2">
                    {insights.popularFragments.map((fragment, index) => (
                      <li key={index} className="flex justify-between items-center p-3 bg-slate-800/40 rounded-md border border-purple-700/50">
                        <span className="text-sm text-purple-200">{fragment.alias_fragment}</span>
                        <span className="text-sm font-medium text-pink-400 bg-pink-900/50 px-2 py-1 rounded-full">{fragment.usage_count.toLocaleString()} uses</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default EmailUsageInsights;
