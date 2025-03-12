
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BikeCard from '@/components/ui/BikeCard';
import { BIKES, BIKE_CATEGORIES } from '@/lib/constants';
import { Bike } from '@/lib/types';

const Bikes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredBikes, setFilteredBikes] = useState<Bike[]>(BIKES);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const filtered = BIKES.filter(bike => {
      // Filter by search term
      const matchesSearch = bike.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           bike.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by category
      const matchesCategory = selectedCategory === 'all' || bike.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredBikes(filtered);
  }, [searchTerm, selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-muted/20 py-16">
      <div className="container px-6 py-8">
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Our Bike Collection
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Browse our selection of premium bikes for rent. Find the perfect ride for your adventure.
          </motion.p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search bikes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex-1"
              >
                <Filter className="h-4 w-4 mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>
          </div>
          
          <div className={`md:flex mt-6 gap-10 ${showFilters ? 'block' : 'hidden md:flex'}`}>
            <div className="md:max-w-xs">
              <h3 className="font-medium mb-3">Categories</h3>
              <RadioGroup 
                value={selectedCategory} 
                onValueChange={setSelectedCategory}
                className="space-y-2"
              >
                {BIKE_CATEGORIES.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={category.id} id={`category-${category.id}`} />
                    <Label htmlFor={`category-${category.id}`} className="cursor-pointer">{category.name}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div className="hidden md:block border-l border-border"></div>
            
            <div className="mt-6 md:mt-0">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid grid-cols-3 w-full max-w-md">
                  <TabsTrigger value="all">All Bikes</TabsTrigger>
                  <TabsTrigger value="available">Available</TabsTrigger>
                  <TabsTrigger value="unavailable">Unavailable</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          {filteredBikes.length > 0 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredBikes.map((bike) => (
                <motion.div key={bike.id} variants={itemVariants}>
                  <BikeCard bike={bike} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-lg font-medium mb-2">No bikes found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bikes;
