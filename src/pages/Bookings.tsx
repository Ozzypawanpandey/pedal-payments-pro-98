
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Bike, Booking } from '@/lib/types';
import { Button } from '@/components/ui/button';
import BookingCard from '@/components/ui/BookingCard';
import { Loader2, Plus } from 'lucide-react';

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

const mockBookings: Booking[] = [
  {
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
  {
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
  {
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
];

// Mock fetch bookings function
const fetchBookings = async (): Promise<Booking[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBookings);
    }, 800);
  });
};

const Bookings = () => {
  const navigate = useNavigate();
  
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: fetchBookings,
  });

  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <Button onClick={() => navigate('/bikes')} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Booking
        </Button>
      </div>

      {bookings && bookings.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              bike={mockBikes[booking.bikeId]} // Pass bike as a prop
              onClick={() => navigate(`/bookings/${booking.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">No bookings found</h2>
          <p className="text-muted-foreground mb-6">You haven't made any bookings yet.</p>
          <Button onClick={() => navigate('/bikes')}>
            Browse Bikes
          </Button>
        </div>
      )}
    </div>
  );
};

export default Bookings;
