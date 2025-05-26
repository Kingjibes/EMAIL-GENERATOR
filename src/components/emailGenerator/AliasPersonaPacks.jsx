
import React, { useEffect, useState } from 'react';
    import { motion } from 'framer-motion';
    import { supabase } from '@/lib/supabaseClient';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import * as LucideIcons from 'lucide-react';

    const AliasPersonaPacks = ({ onSelect }) => {
      const [packs, setPacks] = useState([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        const fetchPacks = async () => {
          setLoading(true);
          const { data, error } = await supabase
            .from('alias_suggestions')
            .select('pack_name, alias_fragment, description, icon')
            .order('pack_name')
            .order('alias_fragment');

          if (error) {
            console.error('Error fetching persona packs:', error);
            setPacks([]);
          } else {
            const groupedPacks = data.reduce((acc, item) => {
              if (!acc[item.pack_name]) {
                acc[item.pack_name] = { 
                  name: item.pack_name, 
                  suggestions: [], 
                  icon: item.icon || 'Package', // Use first item's icon or default
                  iconSet: !!item.icon 
                };
              }
              acc[item.pack_name].suggestions.push({ fragment: item.alias_fragment, description: item.description });
              
              // Prioritize an explicitly set icon for the pack
              if (item.icon && !acc[item.pack_name].iconSet) {
                acc[item.pack_name].icon = item.icon;
                acc[item.pack_name].iconSet = true;
              }
              return acc;
            }, {});
            setPacks(Object.values(groupedPacks));
          }
          setLoading(false);
        };
        fetchPacks();
      }, []);

      if (loading) {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="glassmorphism animate-pulse bg-slate-800/50 border-purple-700/30">
                <CardHeader>
                  <div className="h-6 bg-slate-700 rounded w-3/4"></div>
                </CardHeader>
                <CardContent className="space-y-2 pt-4">
                  <div className="h-4 bg-slate-700 rounded w-full"></div>
                  <div className="h-4 bg-slate-700 rounded w-5/6"></div>
                  <div className="h-4 bg-slate-700 rounded w-full mt-2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      }

      if (packs.length === 0) {
        return <p className="text-center text-purple-300 mt-8 text-lg">No persona packs available at the moment. Please check back later.</p>;
      }
      
      const getIconComponent = (iconName) => {
        const IconComponent = LucideIcons[iconName] || LucideIcons.Package;
        return <IconComponent className="w-6 h-6 mr-3 text-pink-400 flex-shrink-0" />;
      };

      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4"
        >
          {packs.map((pack, index) => (
            <motion.div
              key={pack.name + index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <Card className="glassmorphism shadow-xl shadow-pink-500/20 h-full flex flex-col bg-slate-800/50 border-purple-700/30 hover:border-pink-500/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center">
                    {getIconComponent(pack.icon)}
                    <CardTitle className="text-xl font-semibold text-pink-300">{pack.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow pt-0">
                  <ul className="space-y-2.5">
                    {pack.suggestions.map((suggestion, sIndex) => (
                      <li key={suggestion.fragment + sIndex} className="flex justify-between items-center py-1 border-b border-purple-800/50 last:border-b-0">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-purple-200 truncate" title={suggestion.fragment}>{suggestion.fragment}</p>
                          {suggestion.description && <p className="text-xs text-purple-400 truncate" title={suggestion.description}>{suggestion.description}</p>}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => onSelect(suggestion.fragment)} 
                          className="text-purple-300 hover:text-pink-300 hover:bg-purple-700/70 ml-2 px-3 py-1 shrink-0"
                        >
                          Use
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      );
    };

    export default AliasPersonaPacks;
