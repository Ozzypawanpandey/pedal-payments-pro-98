
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Bike, Booking, BookingStatus } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import BookingReceipt from '@/components/ui/BookingReceipt';
import { format } from 'date-fns';
import { ArrowLeft, Loader2, Calendar, Clock, CreditCard } from 'lucide-react';

const mockBikes: Record<string, Bike> = {
  'bike1': {
    id: 'bike1',
    name: 'Mountain Explorer X4',
    description: 'A robust mountain bike suitable for all terrains',
    category: 'mountain',
    price: 299.99,
    pricePerHour: 5.99,
    pricePerDay: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1470&auto=format&fit=crop',
    features: ['Aluminum frame', 'Disc brakes', '21-speed', 'Front suspension'],
    available: true
  },
  'bike2': {
    id: 'bike2',
    name: 'City Cruiser Deluxe',
    description: 'Perfect for city commuting with style and comfort',
    category: 'city',
    price: 249.99,
    pricePerHour: 4.99,
    pricePerDay: 24.99,
    imageUrl: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=1476&auto=format&fit=crop',
    features: ['Step-through frame', 'Basket', '7-speed', 'Comfort seat'],
    available: true
  }
};

const mockBookings: Record<string, Booking> = {
  'booking1': {
    id: 'booking1',
    bikeId: 'bike1',
    startDate: new Date('2023-07-25'),
    endDate: new Date('2023-07-28'),
    totalAmount: 89.97,
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'esewa',
    createdAt: new Date('2023-07-20')
  },
  'booking2': {
    id: 'booking2',
    bikeId: 'bike2',
    startDate: new Date('2023-08-15'),
    endDate: new Date('2023-08-17'),
    totalAmount: 49.98,
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'khalti',
    createdAt: new Date('2023-08-10')
  },
  'booking3': {
    id: 'booking3',
    bikeId: 'bike1',
    startDate: new Date('2023-09-05'),
    endDate: new Date('2023-09-07'),
    totalAmount: 59.98,
    status: 'pending',
    paymentStatus: 'unpaid',
    paymentMethod: null,
    createdAt: new Date('2023-09-01')
  }
};

// Mock fetch booking function
const fetchBooking = async (bookingId: string): Promise<{ booking: Booking, bike: Bike }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const booking = mockBookings[bookingId];
      if (!booking) {
        reject(new Error('Booking not found'));
        return;
      }
      
      const bike = mockBikes[booking.bikeId];
      if (!bike) {
        reject(new Error('Bike not found'));
        return;
      }
      
      resolve({ booking, bike });
    }, 800);
  });
};

const getStatusColor = (status: BookingStatus) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'confirmed': return 'bg-blue-100 text-blue-800';
    case 'active': return 'bg-green-100 text-green-800';
    case 'completed': return 'bg-purple-100 text-purple-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const BookingDetail = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => fetchBooking(bookingId || ''),
    enabled: !!bookingId,
  });

  const handleCancelBooking = () => {
    // This would typically call an API to cancel the booking
    toast({
      title: "Booking cancelled",
      description: "Your booking has been cancelled successfully.",
    });
    
    // Redirect to bookings page after cancellation
    navigate('/bookings');
  };

  const handlePayNow = () => {
    toast({
      title: "Payment initiated",
      description: "You will be redirected to the payment gateway.",
    });
    // In a real app, this would redirect to a payment gateway
  };

  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="container py-12">
        <h2 className="text-2xl font-bold mb-4">Booking not found</h2>
        <p>Sorry, we couldn't find the booking you're looking for.</p>
        <Button className="mt-4" onClick={() => navigate('/bookings')}>
          Back to Bookings
        </Button>
      </div>
    );
  }

  const { booking, bike } = data;
  const canCancel = ['pending', 'confirmed'].includes(booking.status);

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="mb-2"
            onClick={() => navigate('/bookings')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Bookings
          </Button>
          <h1 className="text-3xl font-bold">Booking Details</h1>
        </div>
        
        <Badge className={`text-sm py-1 px-3 ${getStatusColor(booking.status)}`}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </Badge>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Booking Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="shrink-0">
                  <img
                    src={bike.imageUrl}
                    alt={bike.name}
                    className="w-32 h-32 object-cover rounded-md"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{bike.name}</h3>
                  <p className="text-muted-foreground">{bike.category} bike</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {bike.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline">{feature}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Rental Period</span>
                  </div>
                  <span className="font-medium">
                    {format(booking.startDate, 'MMM d, yyyy')} - {format(booking.endDate, 'MMM d, yyyy')}
                  </span>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">Booking Date</span>
                  </div>
                  <span className="font-medium">{format(booking.createdAt, 'MMM d, yyyy')}</span>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <CreditCard className="h-4 w-4" />
                    <span className="text-sm">Payment Status</span>
                  </div>
                  <span className="font-medium capitalize">{booking.paymentStatus}</span>
                </div>
              </div>
            </CardContent>
            {canCancel && (
              <CardFooter>
                <Button variant="destructive" onClick={handleCancelBooking}>
                  Cancel Booking
                </Button>
              </CardFooter>
            )}
          </Card>

          <BookingReceipt booking={booking} bike={bike} />
        </div>

        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Payment Method</span>
                <span className="font-medium capitalize">
                  {booking.paymentMethod || 'Not paid'}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Payment Status</span>
                <Badge variant={booking.paymentStatus === 'paid' ? 'default' : 'destructive'}>
                  {booking.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                </Badge>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total Amount</span>
                <span>${booking.totalAmount.toFixed(2)}</span>
              </div>
              
              {booking.paymentStatus !== 'paid' && (
                <Button className="w-full mt-4" onClick={handlePayNow}>
                  Pay Now
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
