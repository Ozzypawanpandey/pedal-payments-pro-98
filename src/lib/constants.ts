
import { type Bike, type BikeCategory, type PaymentMethod, type Booking } from "./types";

export const BIKES: Bike[] = [
  {
    id: "b1",
    name: "Mountain Explorer X1",
    description: "Premium mountain bike with front suspension, perfect for trails and off-road adventures.",
    category: "mountain",
    price: 500,
    pricePerHour: 15,
    pricePerDay: 50,
    imageUrl: "/bikes/mountain-bike-1.jpg",
    features: ["Front Suspension", "Disc Brakes", "21 Speed", "Aluminum Frame"],
    available: true
  },
  {
    id: "b2",
    name: "City Cruiser C1",
    description: "Comfortable city bike with upright position, ideal for daily commutes and city exploration.",
    category: "city",
    price: 350,
    pricePerHour: 10,
    pricePerDay: 35,
    imageUrl: "/bikes/city-bike-1.jpg",
    features: ["Basket", "Lights", "Fenders", "Comfortable Seat"],
    available: true
  },
  {
    id: "b3",
    name: "Road Master R1",
    description: "Lightweight road bike designed for speed and long-distance riding on paved roads.",
    category: "road",
    price: 650,
    pricePerHour: 18,
    pricePerDay: 65,
    imageUrl: "/bikes/road-bike-1.jpg",
    features: ["Carbon Fiber", "Drop Handlebars", "Ultra Light", "Aerodynamic Design"],
    available: true
  },
  {
    id: "b4",
    name: "Electric Glide E1",
    description: "Powerful electric bike with long-range battery, perfect for effortless city commuting.",
    category: "electric",
    price: 900,
    pricePerHour: 25,
    pricePerDay: 90,
    imageUrl: "/bikes/electric-bike-1.jpg",
    features: ["500W Motor", "50km Range", "Quick Charge", "Pedal Assist"],
    available: false
  },
  {
    id: "b5",
    name: "Kids Adventure K1",
    description: "Durable and safe bike for kids, with adjustable seat height and fun design.",
    category: "kids",
    price: 200,
    pricePerHour: 8,
    pricePerDay: 25,
    imageUrl: "/bikes/kids-bike-1.jpg",
    features: ["Safety Wheels", "Adjustable Size", "Durable Build", "Easy Braking"],
    available: true
  },
  {
    id: "b6",
    name: "Folding Compact F1",
    description: "Innovative folding bike, perfect for mixed commutes and limited storage spaces.",
    category: "folding",
    price: 450,
    pricePerHour: 12,
    pricePerDay: 45,
    imageUrl: "/bikes/folding-bike-1.jpg",
    features: ["Compact Fold", "Lightweight", "Carry Bag", "Quick Release"],
    available: true
  },
  {
    id: "b7",
    name: "Mountain Pro X2",
    description: "Advanced mountain bike with full suspension, designed for serious off-road enthusiasts.",
    category: "mountain",
    price: 750,
    pricePerHour: 20,
    pricePerDay: 75,
    imageUrl: "/bikes/mountain-bike-2.jpg",
    features: ["Dual Suspension", "Hydraulic Brakes", "27 Speed", "Carbon Frame"],
    available: true
  },
  {
    id: "b8",
    name: "Urban Rider C2",
    description: "Stylish city bike with integrated smart features, perfect for urban explorers.",
    category: "city",
    price: 400,
    pricePerHour: 12,
    pricePerDay: 40,
    imageUrl: "/bikes/city-bike-2.jpg",
    features: ["GPS Tracking", "Smart Lock", "Puncture Resistant", "Integrated Lights"],
    available: true
  }
];

export const BIKE_CATEGORIES: BikeCategory[] = [
  { id: "all", name: "All Bikes" },
  { id: "mountain", name: "Mountain Bikes" },
  { id: "city", name: "City Bikes" },
  { id: "road", name: "Road Bikes" },
  { id: "electric", name: "Electric Bikes" },
  { id: "kids", name: "Kids Bikes" },
  { id: "folding", name: "Folding Bikes" }
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "esewa",
    name: "eSewa",
    icon: "wallet",
    type: "nepal",
    description: "Pay with your eSewa wallet"
  },
  {
    id: "khalti",
    name: "Khalti",
    icon: "credit-card",
    type: "nepal",
    description: "Pay with your Khalti wallet"
  },
  {
    id: "visa",
    name: "Visa",
    icon: "credit-card",
    type: "international",
    description: "Pay with Visa card"
  },
  {
    id: "mastercard",
    name: "Mastercard",
    icon: "credit-card",
    type: "international",
    description: "Pay with Mastercard"
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: "bk1",
    bikeId: "b3",
    startDate: new Date(Date.now() + 86400000 * 2), // 2 days from now
    endDate: new Date(Date.now() + 86400000 * 4), // 4 days from now
    totalAmount: 130,
    status: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "esewa",
    createdAt: new Date(Date.now() - 86400000) // 1 day ago
  },
  {
    id: "bk2",
    bikeId: "b1",
    startDate: new Date(Date.now() - 86400000 * 1), // 1 day ago
    endDate: new Date(Date.now() + 86400000 * 1), // 1 day from now
    totalAmount: 100,
    status: "active",
    paymentStatus: "paid",
    paymentMethod: "khalti",
    createdAt: new Date(Date.now() - 86400000 * 3) // 3 days ago
  },
  {
    id: "bk3",
    bikeId: "b2",
    startDate: new Date(Date.now() + 86400000 * 5), // 5 days from now
    endDate: new Date(Date.now() + 86400000 * 7), // 7 days from now
    totalAmount: 70,
    status: "pending",
    paymentStatus: "unpaid",
    paymentMethod: null,
    createdAt: new Date() // Now
  }
];

export const ABOUT_CONTENT = {
  mission: "To provide high-quality bikes for rent, promoting sustainable transportation and adventure in Nepal and beyond.",
  vision: "Creating a world where everyone can experience the joy and freedom of cycling, regardless of whether they own a bike.",
  values: [
    {
      title: "Quality",
      description: "We maintain our bikes to the highest standards, ensuring your safety and enjoyment."
    },
    {
      title: "Sustainability",
      description: "We're committed to reducing carbon emissions by promoting cycling as an eco-friendly mode of transportation."
    },
    {
      title: "Accessibility",
      description: "We strive to make cycling accessible to all, with options for every age, skill level, and budget."
    },
    {
      title: "Adventure",
      description: "We believe in the transformative power of exploration and discovery through cycling."
    }
  ],
  story: "Founded in 2023, our bike rental service began with a simple idea: to share our passion for cycling with others. What started as a small collection of bikes has grown into a comprehensive fleet serving both locals and tourists. Our journey is fueled by countless stories of adventures, discoveries, and the smiles of satisfied customers."
};

export const CONTACT_INFO = {
  address: "123 Cycling Lane, Kathmandu, Nepal",
  phone: "+977 1234567890",
  email: "info@pedalnepal.com",
  hours: "Monday-Saturday: 8am - 8pm, Sunday: 9am - 5pm",
  socialMedia: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com"
  }
};
