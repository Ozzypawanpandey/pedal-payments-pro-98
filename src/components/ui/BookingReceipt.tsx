
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Bike, Booking } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Clock, Calendar, Download, CheckCircle, XCircle } from 'lucide-react';

interface BookingReceiptProps {
  booking: Booking;
  bike: Bike; // Added bike prop
}

const BookingReceipt: React.FC<BookingReceiptProps> = ({ booking, bike }) => {
  // Calculate days between start and end date
  const startDate = new Date(booking.startDate);
  const endDate = new Date(booking.endDate);
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <Card className="receipt-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Booking Receipt</CardTitle>
        <Button variant="outline" size="sm" onClick={handlePrint}>
          <Download className="h-4 w-4 mr-2" />
          Print
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">PedalPro Bike Rentals</h3>
            <p className="text-sm text-muted-foreground">Thamel, Kathmandu, Nepal</p>
            <p className="text-sm text-muted-foreground">contact@pedalpro.com</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Receipt No.</div>
            <div className="font-medium">R-{booking.id.substring(0, 8)}</div>
            <div className="text-sm text-muted-foreground mt-2">Date</div>
            <div className="font-medium">{formatDate(booking.createdAt)}</div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h4 className="font-medium mb-2">Rental Details</h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div className="text-muted-foreground">Booking ID</div>
            <div>{booking.id}</div>
            <div className="text-muted-foreground">Bike Model</div>
            <div>{bike.name}</div>
            <div className="text-muted-foreground">Rental Period</div>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDate(startDate)} - {formatDate(endDate)}
            </div>
            <div className="text-muted-foreground">Duration</div>
            <div>{days} day{days !== 1 ? 's' : ''}</div>
            <div className="text-muted-foreground">Status</div>
            <div className="capitalize">{booking.status}</div>
            <div className="text-muted-foreground">Payment Method</div>
            <div className="capitalize">{booking.paymentMethod || 'Not paid'}</div>
            <div className="text-muted-foreground">Payment Status</div>
            <div className="flex items-center">
              {booking.paymentStatus === 'paid' ? (
                <>
                  <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                  <span className="text-green-600 font-medium">Paid</span>
                </>
              ) : (
                <>
                  <XCircle className="h-3 w-3 mr-1 text-red-500" />
                  <span className="text-red-500 font-medium">Unpaid</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h4 className="font-medium mb-2">Price Breakdown</h4>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Daily Rate:</span>
              <span>{formatCurrency(bike.pricePerDay)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Duration:</span>
              <span>{days} day{days !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>{formatCurrency(bike.pricePerDay * days)}</span>
            </div>
            
            <Separator className="my-2" />
            
            <div className="flex justify-between font-medium">
              <span>Total:</span>
              <span>{formatCurrency(booking.totalAmount)}</span>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <p>Thank you for choosing PedalPro for your biking adventure!</p>
          <p className="mt-1">For any queries related to this booking, please contact us at support@pedalpro.com or call us at +977-01-1234567.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingReceipt;
