
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bike, Booking } from '@/lib/types';
import { formatCurrency, formatDate, getBikeById, getStatusColor } from '@/lib/utils';

interface BookingCardProps {
  booking: Booking;
  bike: Bike;  // Added the bike prop
  onCancel?: (bookingId: string) => void;
  onClick?: () => void; // Added onClick handler
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, bike, onCancel, onClick }) => {
  if (!bike) return null;
  
  const canCancel = booking.status === 'pending' || booking.status === 'confirmed';

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/4">
            <div className="aspect-[4/3] relative rounded-md overflow-hidden">
              <img 
                src={bike.imageUrl} 
                alt={bike.name} 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          
          <div className="w-full md:w-3/4 space-y-3">
            <div className="flex flex-wrap justify-between items-start gap-2">
              <h3 className="font-semibold text-lg">{bike.name}</h3>
              <div className="flex flex-col items-end">
                <span className="font-medium">{formatCurrency(booking.totalAmount)}</span>
                <span className={`inline-flex items-center text-xs px-2 py-1 rounded-full ${getStatusColor(booking.paymentStatus)}`}>
                  {booking.paymentStatus === 'paid' ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" /> Paid
                    </>
                  ) : (
                    <>
                      <XCircle className="h-3 w-3 mr-1" /> Unpaid
                    </>
                  )}
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>From: {formatDate(booking.startDate)}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>To: {formatDate(booking.endDate)}</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-2">
              <span className={`inline-flex items-center text-xs px-2 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
              
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span>Created: {formatDate(booking.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-5 pb-5 pt-0 flex justify-between gap-2">
        {onClick ? (
          <Button variant="outline" className="w-full" onClick={onClick}>View Details</Button>
        ) : (
          <Link to={`/bookings/${booking.id}`} className="flex-1">
            <Button variant="outline" className="w-full">View Details</Button>
          </Link>
        )}
        
        {canCancel && onCancel && (
          <Button 
            variant="destructive" 
            className="flex-1"
            onClick={() => onCancel(booking.id)}
          >
            Cancel Booking
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookingCard;
