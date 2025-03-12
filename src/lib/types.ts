
export type BikeCategory = {
  id: string;
  name: string;
};

export type Bike = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  pricePerHour: number;
  pricePerDay: number;
  imageUrl: string;
  features: string[];
  available: boolean;
};

export type PaymentMethod = {
  id: string;
  name: string;
  icon: string;
  type: 'nepal' | 'international';
  description: string;
};

export type BookingStatus = 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
export type PaymentStatus = 'paid' | 'unpaid' | 'refunded';

export type Booking = {
  id: string;
  bikeId: string;
  startDate: Date;
  endDate: Date;
  totalAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string | null;
  createdAt: Date;
};

export type UserLocation = 'nepal' | 'international';

export type AppUser = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location: UserLocation;
  bookings: string[]; // Booking IDs
};
