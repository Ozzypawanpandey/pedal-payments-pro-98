
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Users, Heart, Bike, Clock, ShieldCheck } from 'lucide-react';

const About = () => {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">About BikeRental</h1>
        <p className="text-lg text-muted-foreground">
          Providing high-quality bikes and exceptional service since 2015.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="mb-4 text-muted-foreground">
            BikeRental was founded in 2015 with a simple mission: to provide locals and tourists with a convenient, 
            eco-friendly way to experience the beautiful landscapes of Nepal and beyond.
          </p>
          <p className="mb-4 text-muted-foreground">
            What started as a small collection of bikes has grown into a diverse fleet catering to all types of riders, 
            from casual city explorers to serious mountain biking enthusiasts.
          </p>
          <p className="text-muted-foreground">
            Today, we continue to innovate in the bike rental space, focusing on quality equipment, exceptional 
            customer service, and sustainable transportation options for our community.
          </p>
        </div>
        
        <div className="relative h-full min-h-[300px]">
          <img 
            src="https://images.unsplash.com/photo-1597118792616-30ee079230ff?q=80&w=1470&auto=format&fit=crop" 
            alt="Our bike shop" 
            className="rounded-lg object-cover h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
        </div>
      </div>

      <Separator className="my-16" />

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader className="pb-2">
              <Users className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Community First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We believe in building strong relationships with our customers and the local community.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <Heart className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Sustainability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Promoting eco-friendly transportation options to reduce carbon footprints and preserve our environment.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <ShieldCheck className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Quality & Safety</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Maintaining the highest standards of equipment quality and safety for all our customers.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className="my-16" />

      <div>
        <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Us?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Premium Bikes</h3>
              <p className="text-muted-foreground">
                Our fleet includes top-quality bikes from respected brands, regularly maintained to ensure optimal performance.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Bike className="h-6 w-6 text-primary shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Wide Selection</h3>
              <p className="text-muted-foreground">
                From city cruisers to mountain bikes, we have the perfect ride for every adventure.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Clock className="h-6 w-6 text-primary shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Flexible Rentals</h3>
              <p className="text-muted-foreground">
                Hourly, daily, or weekly rentals available to suit your schedule and needs.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Users className="h-6 w-6 text-primary shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Expert Advice</h3>
              <p className="text-muted-foreground">
                Our team can provide route recommendations and tips to enhance your biking experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
