
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Bike, UserLocation, PaymentMethod } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/use-toast';
import { Calendar } from '@/components/ui/calendar';
import PaymentSelector from '@/components/ui/PaymentSelector';
import { format, addDays, differenceInDays } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const mockFetchBike = async (bikeId: string): Promise<Bike> => {
  // This would be replaced with a real API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: bikeId,
        name: "Mountain Explorer X4",
        description: "A robust mountain bike suitable for all terrains",
        category: "mountain",
        price: 299.99,
        pricePerHour: 5.99,
        pricePerDay: 29.99,
        imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1470&auto=format&fit=crop",
        features: ["Aluminum frame", "Disc brakes", "21-speed", "Front suspension"],
        available: true
      });
    }, 500);
  });
};

const Checkout = () => {
  const { bikeId } = useParams<{ bikeId: string }>();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(addDays(new Date(), 3));
  const [userLocation, setUserLocation] = useState<UserLocation>('nepal');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const { data: bike, isLoading } = useQuery({
    queryKey: ['bike', bikeId],
    queryFn: () => mockFetchBike(bikeId || ''),
    enabled: !!bikeId,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({ ...prev, [name]: value }));
  };

  const calculateTotalAmount = () => {
    if (!bike || !startDate || !endDate) return 0;
    
    const days = Math.max(1, differenceInDays(endDate, startDate));
    return bike.pricePerDay * days;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPaymentMethod) {
      toast({
        title: "Payment method required",
        description: "Please select a payment method to proceed",
        variant: "destructive",
      });
      return;
    }

    if (!startDate || !endDate) {
      toast({
        title: "Dates required",
        description: "Please select both start and end dates",
        variant: "destructive",
      });
      return;
    }

    // This would typically call an API to create the booking
    toast({
      title: "Booking confirmed!",
      description: "Your booking has been successfully created.",
    });
    
    // Redirect to bookings page after successful booking
    navigate('/bookings');
  };

  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!bike) {
    return (
      <div className="container py-12">
        <h2 className="text-2xl font-bold mb-4">Bike not found</h2>
        <p>Sorry, we couldn't find the bike you're looking for.</p>
        <Button className="mt-4" onClick={() => navigate('/bikes')}>
          Browse Bikes
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Complete Your Booking</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Rental Period</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label>Start Date</Label>
                    <div className="mt-2 border rounded-md">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        disabled={(date) => date < new Date()}
                        className="rounded-md border"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <div className="mt-2 border rounded-md">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        disabled={(date) => date < (startDate || new Date())}
                        className="rounded-md border"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name"
                      value={contactInfo.name}
                      onChange={handleInputChange}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email"
                      value={contactInfo.email}
                      onChange={handleInputChange}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      value={contactInfo.phone}
                      onChange={handleInputChange}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <RadioGroup 
                    value={userLocation} 
                    onValueChange={(value) => setUserLocation(value as UserLocation)}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nepal" id="nepal" />
                      <Label htmlFor="nepal">I am a resident of Nepal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="international" id="international" />
                      <Label htmlFor="international">I am an international visitor</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <PaymentSelector
                  userLocation={userLocation}
                  selectedPaymentMethod={selectedPaymentMethod}
                  onSelectPaymentMethod={setSelectedPaymentMethod}
                />
              </CardContent>
            </Card>

            <Button type="submit" className="w-full md:w-auto">
              Confirm Booking
            </Button>
          </form>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={bike.imageUrl} 
                  alt={bike.name} 
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{bike.name}</h3>
                  <p className="text-sm text-muted-foreground">{bike.category} bike</p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Daily Rate:</span>
                  <span>{formatCurrency(bike.pricePerDay)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>
                    {startDate && endDate ? (
                      `${Math.max(1, differenceInDays(endDate, startDate))} days`
                    ) : (
                      'Select dates'
                    )}
                  </span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>{formatCurrency(calculateTotalAmount())}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
