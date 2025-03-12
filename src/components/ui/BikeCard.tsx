
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bike } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

interface BikeCardProps {
  bike: Bike;
}

const BikeCard: React.FC<BikeCardProps> = ({ bike }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-md">
      <div className="aspect-[4/3] relative overflow-hidden">
        <div 
          className={`lazy-image ${imageLoaded ? 'loaded' : ''} h-full w-full bg-muted`}
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
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <div className="absolute top-2 right-2">
          <Badge variant={bike.available ? "default" : "destructive"} className="rounded-full px-3 py-1">
            {bike.available ? 'Available' : 'Unavailable'}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{bike.name}</h3>
          <span className="font-medium text-lg">{formatCurrency(bike.pricePerDay)}<span className="text-xs text-muted-foreground">/day</span></span>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{bike.description}</p>
        
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
          {bike.features.slice(0, 4).map((feature, index) => (
            <div key={index} className="flex items-center">
              <Check className="h-3 w-3 mr-1 text-primary" />
              <span className="truncate">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="px-5 pb-5 pt-0">
        <Link to={`/bikes/${bike.id}`} className="w-full">
          <Button className="w-full btn-hover-effect" disabled={!bike.available}>
            {bike.available ? 'View Details' : 'Not Available'}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BikeCard;
