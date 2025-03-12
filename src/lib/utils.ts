
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, differenceInDays, differenceInHours, addDays } from "date-fns";
import { BIKES } from "./constants";
import { Bike, Booking } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NPR',
  }).format(amount);
}

export function formatDate(date: Date): string {
  return format(date, 'MMM dd, yyyy');
}

export function formatDateTime(date: Date): string {
  return format(date, 'MMM dd, yyyy h:mm a');
}

export function calculateRentalDuration(startDate: Date, endDate: Date): { days: number; hours: number } {
  // Add one day to end date since rentals are inclusive of the end date
  const adjustedEndDate = addDays(endDate, 1);
  
  // Calculate full days
  const days = differenceInDays(adjustedEndDate, startDate);
  
  // Calculate remaining hours
  const remainingHours = differenceInHours(
    adjustedEndDate, 
    new Date(startDate.getTime() + days * 24 * 60 * 60 * 1000)
  );
  
  return {
    days,
    hours: remainingHours
  };
}

export function calculateRentalCost(bike: Bike, startDate: Date, endDate: Date): number {
  const { days, hours } = calculateRentalDuration(startDate, endDate);
  
  // If rental period is less than 24 hours, charge hourly up to the daily rate
  if (days === 0 && hours > 0) {
    return Math.min(hours * bike.pricePerHour, bike.pricePerDay);
  }
  
  // Calculate base cost for full days
  const dailyCost = days * bike.pricePerDay;
  
  // Add hourly cost for additional hours (if any)
  const hourlyCost = hours * bike.pricePerHour;
  
  // If hourly cost exceeds daily rate, charge another day
  if (hourlyCost > bike.pricePerDay) {
    return dailyCost + bike.pricePerDay;
  }
  
  return dailyCost + hourlyCost;
}

export function getBikeById(bikeId: string): Bike | undefined {
  return BIKES.find(bike => bike.id === bikeId);
}

export function generateBookingId(): string {
  return `bk${Date.now().toString(36)}${Math.random().toString(36).substring(2, 5)}`;
}

export function generateReceiptNumber(): string {
  return `R-${Date.now().toString().substring(5)}`;
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'confirmed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'active':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-purple-100 text-purple-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    case 'paid':
      return 'bg-emerald-100 text-emerald-800';
    case 'unpaid':
      return 'bg-orange-100 text-orange-800';
    case 'refunded':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function getUserFromLocalStorage() {
  const userJson = localStorage.getItem('bikeUser');
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson);
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    return null;
  }
}

export function saveUserToLocalStorage(user: any) {
  localStorage.setItem('bikeUser', JSON.stringify(user));
}

export function getBookingsFromLocalStorage(): Booking[] {
  const bookingsJson = localStorage.getItem('bikeBookings');
  if (!bookingsJson) return [];
  
  try {
    const bookings = JSON.parse(bookingsJson);
    return bookings.map((booking: any) => ({
      ...booking,
      startDate: new Date(booking.startDate),
      endDate: new Date(booking.endDate),
      createdAt: new Date(booking.createdAt)
    }));
  } catch (error) {
    console.error('Error parsing bookings from localStorage:', error);
    return [];
  }
}

export function saveBookingsToLocalStorage(bookings: Booking[]) {
  localStorage.setItem('bikeBookings', JSON.stringify(bookings));
}

export function addBooking(booking: Booking) {
  const bookings = getBookingsFromLocalStorage();
  bookings.push(booking);
  saveBookingsToLocalStorage(bookings);
  return booking;
}

export function updateBooking(bookingId: string, updates: Partial<Booking>) {
  const bookings = getBookingsFromLocalStorage();
  const updatedBookings = bookings.map(booking => 
    booking.id === bookingId ? { ...booking, ...updates } : booking
  );
  saveBookingsToLocalStorage(updatedBookings);
  return updatedBookings.find(booking => booking.id === bookingId);
}

export function getBookingById(bookingId: string): Booking | undefined {
  const bookings = getBookingsFromLocalStorage();
  return bookings.find(booking => booking.id === bookingId);
}
