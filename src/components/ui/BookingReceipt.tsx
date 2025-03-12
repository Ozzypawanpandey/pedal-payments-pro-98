
import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Check, Bike, Calendar, Clock } from 'lucide-react';
import { Booking } from '@/lib/types';
import { formatCurrency, generateReceiptNumber, getBikeById, calculateRentalDuration } from '@/lib/utils';

interface BookingReceiptProps {
  booking: Booking;
}

const BookingReceipt: React.FC<BookingReceiptProps> = ({ booking }) => {
  const bike = getBikeById(booking.bikeId);
  
  if (!bike) return null;
  
  const receiptNumber = generateReceiptNumber();
  const { days, hours } = calculateRentalDuration(booking.startDate, booking.endDate);
  
  return (
    <Card className="overflow-hidden border-0 shadow-xl">
      <CardContent className="p-0">
        <div className="bg-primary py-6 px-6 text-white text-center">
          <h3 className="text-xl font-semibold">Booking Receipt</h3>
          <p className="text-sm opacity-80">Receipt #{receiptNumber}</p>
        </div>
        
        <div className="px-6 py-6 space-y-6">
          <div className="flex flex-col space-y-2">
            <div className="text-sm text-muted-foreground">Bike</div>
            <div className="flex items-center">
              <Bike className="h-4 w-4 mr-2 text-primary" />
              <span className="font-medium">{bike.name}</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between gap-6">
            <div className="flex flex-col space-y-2">
              <div className="text-sm text-muted-foreground">Start Date</div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-primary" />
                <span>{format(booking.startDate, 'MMM dd, yyyy')}</span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <div className="text-sm text-muted-foreground">End Date</div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-primary" />
                <span>{format(booking.endDate, 'MMM dd, yyyy')}</span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <div className="text-sm text-muted-foreground">Duration</div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-primary" />
                <span>
                  {days > 0 && `${days} day${days > 1 ? 's' : ''}`}
                  {hours > 0 && days > 0 && ', '}
                  {hours > 0 && `${hours} hour${hours > 1 ? 's' : ''}`}
                </span>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Base Rate</span>
              <span>{formatCurrency(bike.pricePerDay)}/day</span>
            </div>
            
            {days > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm">{days} day{days > 1 ? 's' : ''}</span>
                <span>{formatCurrency(days * bike.pricePerDay)}</span>
              </div>
            )}
            
            {hours > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm">{hours} hour{hours > 1 ? 's' : ''}</span>
                <span>{formatCurrency(hours * bike.pricePerHour)}</span>
              </div>
            )}
            
            <Separator />
            
            <div className="flex justify-between items-center font-bold">
              <span>Total</span>
              <span>{formatCurrency(booking.totalAmount)}</span>
            </div>
          </div>
          
          {booking.paymentStatus === 'paid' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
              <Check className="h-5 w-5 text-green-600 mr-2" />
              <div>
                <p className="font-medium text-green-800">Payment Completed</p>
                <p className="text-xs text-green-700">Paid via {booking.paymentMethod}</p>
              </div>
            </div>
          )}
          
          {booking.paymentStatus === 'unpaid' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="font-medium text-yellow-800">Payment Pending</p>
              <p className="text-xs text-yellow-700">Please complete your payment to confirm this booking.</p>
            </div>
          )}
          
          <div className="text-center text-xs text-muted-foreground">
            <p>Thank you for choosing PedalPro!</p>
            <p>Created on: {format(booking.createdAt, 'MMM dd, yyyy h:mm a')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingReceipt;
