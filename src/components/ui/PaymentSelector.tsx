
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CreditCard, Wallet } from 'lucide-react';
import { PaymentMethod, UserLocation } from '@/lib/types';
import { PAYMENT_METHODS } from '@/lib/constants';

interface PaymentSelectorProps {
  userLocation: UserLocation;
  selectedPayment: string | null;
  onSelect: (paymentId: string) => void;
}

const PaymentSelector: React.FC<PaymentSelectorProps> = ({
  userLocation,
  selectedPayment,
  onSelect,
}) => {
  // Filter payment methods based on user location
  const availablePaymentMethods = PAYMENT_METHODS.filter(
    (method) => method.type === userLocation
  );

  return (
    <div className="space-y-4">
      <RadioGroup
        value={selectedPayment || undefined}
        onValueChange={onSelect}
        className="space-y-3"
      >
        {availablePaymentMethods.map((method) => (
          <div
            key={method.id}
            className={`flex items-center space-x-3 border rounded-lg p-4 transition-all ${
              selectedPayment === method.id
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <RadioGroupItem value={method.id} id={method.id} />
            <Label
              htmlFor={method.id}
              className="flex flex-1 items-center cursor-pointer"
            >
              <div className="mr-3">
                {method.icon === 'credit-card' ? (
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Wallet className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium">{method.name}</p>
                <p className="text-xs text-muted-foreground">{method.description}</p>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default PaymentSelector;
