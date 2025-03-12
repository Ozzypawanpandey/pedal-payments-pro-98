
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Clock, Calendar, Check, X, ArrowRight, Info } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Bike } from '@/lib/types';
import { BIKES } from '@/lib/constants';
import { formatCurrency, calculateRentalCost } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const BikeDetail = () => {
  const { bikeId } = useParams<{ bikeId: string }>();
  const navigate = useNavigate();
  const [bike, setBike] = useState<Bike | null>(null);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>(new Date());
  const [rentalCost, setRentalCost] = useState<number>(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Find the bike by ID
  useEffect(() => {
    const foundBike = BIKES.find(b => b.id === bikeId);
    if (foundBike) {
      setBike(foundBike);
    } else {
      navigate('/bikes');
      toast({
        title: "Bike not found",
        description: "The bike you're looking for doesn't exist.",
        variant: "destructive"
      });
    }
  }, [bikeId, navigate]);

  // Calculate rental cost when dates change
  useEffect(() => {
    if (bike && selectedStartDate && selectedEndDate) {
      const cost = calculateRentalCost(bike, selectedStartDate, selectedEndDate);
      setRentalCost(cost);
    }
  }, [bike, selectedStartDate, selectedEndDate]);

  const handleBookNow = () => {
    if (!bike || !selectedStartDate || !selectedEndDate) return;
    
    if (!bike.available) {
      toast({
        title: "Bike unavailable",
        description: "This bike is currently not available for rental.",
        variant: "destructive"
      });
      return;
    }
    
    navigate(`/checkout/${bike.id}`, {
      state: {
        startDate: selectedStartDate,
        endDate: selectedEndDate,
        rentalCost
      }
    });
  };

  if (!bike) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-12 w-48 bg-muted rounded mx-auto mb-4"></div>
          <div className="h-6 w-64 bg-muted rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 py-16">
      <div className="container px-6 py-8">
        {/* Back button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/bikes')}
          className="mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Bikes
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Bike Image and Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <Card className="overflow-hidden bg-white shadow-sm h-full">
              <CardContent className="p-0">
                <div className="relative aspect-video lg:aspect-[16/9]">
                  <div 
                    className={`lazy-image ${imgLoaded ? 'loaded' : ''} h-full w-full bg-muted`}
                    style={{ 
                      backgroundImage: `url(${bike.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <img 
                      src={bike.imageUrl} 
                      alt={bike.name} 
                      className="opacity-0 absolute inset-0 h-full w-full object-cover"
                      onLoad={() => setImgLoaded(true)}
                    />
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant={bike.available ? "default" : "destructive"} className="rounded-full px-3 py-1">
                      {bike.available ? 'Available' : 'Unavailable'}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <h1 className="text-2xl font-bold">{bike.name}</h1>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{formatCurrency(bike.pricePerDay)}</div>
                      <div className="text-sm text-muted-foreground">per day</div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">{bike.description}</p>
                  
                  <Separator className="my-6" />
                  
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {bike.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center">
                          <Check className="h-5 w-5 text-green-600 mr-2" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div>
                    <h3 className="font-medium mb-3">Pricing</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Hourly Rate</span>
                          <span className="font-medium">{formatCurrency(bike.pricePerHour)}</span>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Daily Rate</span>
                          <span className="font-medium">{formatCurrency(bike.pricePerDay)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Booking Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="overflow-hidden bg-white shadow-sm sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Book This Bike</h2>
                
                <div className="space-y-6">
                  {/* Date Selection */}
                  <div>
                    <div className="flex items-center mb-3">
                      <Calendar className="h-5 w-5 mr-2" />
                      <h3 className="font-medium">Rental Period</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Start Date</div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left">
                              {selectedStartDate ? (
                                format(selectedStartDate, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={selectedStartDate}
                              onSelect={setSelectedStartDate}
                              initialFocus
                              disabled={(date) => date < new Date()}
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">End Date</div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left">
                              {selectedEndDate ? (
                                format(selectedEndDate, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={selectedEndDate}
                              onSelect={setSelectedEndDate}
                              initialFocus
                              disabled={(date) => selectedStartDate ? date <= selectedStartDate : date <= new Date()}
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                  
                  {/* Rental Summary */}
                  <div>
                    <div className="flex items-center mb-3">
                      <Info className="h-5 w-5 mr-2" />
                      <h3 className="font-medium">Rental Summary</h3>
                    </div>
                    
                    <div className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bike</span>
                        <span>{bike.name}</span>
                      </div>
                      
                      {selectedStartDate && selectedEndDate && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Duration</span>
                            <span>
                              {format(selectedStartDate, 'MMM d')} - {format(selectedEndDate, 'MMM d')}
                            </span>
                          </div>
                          
                          <Separator />
                          
                          <div className="flex justify-between font-bold">
                            <span>Total Cost</span>
                            <span>{formatCurrency(rentalCost)}</span>
                          </div>
                          
                          <div className="text-xs text-muted-foreground">
                            * Final price may include additional charges based on the exact rental duration.
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <Button 
                    className="w-full btn-hover-effect"
                    size="lg"
                    onClick={handleBookNow}
                    disabled={!bike.available}
                  >
                    {bike.available ? (
                      <>
                        Proceed to Checkout
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    ) : (
                      <>
                        Currently Unavailable
                        <X className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                  
                  {!bike.available && (
                    <div className="text-center text-sm text-muted-foreground">
                      This bike is currently unavailable for rent. Please check back later or browse our other options.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BikeDetail;
