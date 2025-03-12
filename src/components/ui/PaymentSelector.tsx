
import React from 'react';
import { Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { UserLocation } from '@/lib/types';

interface PaymentMethod {
  id: string;
  name: string;
  type: 'nepal' | 'international';
  icon: string;
  description: string;
}

interface PaymentSelectorProps {
  userLocation: UserLocation;
  selectedPayment: string | null; // Changed from selectedPaymentMethod
  onSelectPaymentMethod: (method: string) => void;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'esewa',
    name: 'eSewa',
    type: 'nepal',
    icon: '💸',
    description: 'Pay using your eSewa account'
  },
  {
    id: 'khalti',
    name: 'Khalti',
    type: 'nepal',
    icon: '💰',
    description: 'Pay using your Khalti account'
  },
  {
    id: 'visa',
    name: 'Visa Card',
    type: 'international',
    icon: '💳',
    description: 'Pay using your Visa credit or debit card'
  },
  {
    id: 'mastercard',
    name: 'Mastercard',
    type: 'international',
    icon: '💳',
    description: 'Pay using your Mastercard credit or debit card'
  },
  {
    id: 'onsite',
    name: 'Pay on Site',
    type: 'nepal',
    icon: '💵',
    description: 'Pay when you pick up the bike'
  },
  {
    id: 'onsite',
    name: 'Pay on Site',
    type: 'international',
    icon: '💵',
    description: 'Pay when you pick up the bike'
  }
];

const PaymentSelector: React.FC<PaymentSelectorProps> = ({ 
  userLocation, 
  selectedPayment, // Changed from selectedPaymentMethod
  onSelectPaymentMethod 
}) => {
  const filteredPaymentMethods = paymentMethods.filter(
    method => method.type === userLocation
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {filteredPaymentMethods.map((method) => (
        <Card 
          key={`${method.id}-${method.type}`}
          className={`p-4 cursor-pointer transition-all hover:border-primary ${
            selectedPayment === method.id ? 'border-2 border-primary' : ''
          }`}
          onClick={() => onSelectPaymentMethod(method.id)}
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">{method.icon}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{method.name}</h3>
                {selectedPayment === method.id && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{method.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PaymentSelector;
