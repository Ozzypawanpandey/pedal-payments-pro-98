
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Bike, Clock, CreditCard, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BikeCard from "@/components/ui/BikeCard";
import { BIKES } from "@/lib/constants";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const stepsData = [
    {
      icon: <Bike className="h-8 w-8 text-primary" />,
      title: "Choose a Bike",
      description: "Browse our selection of high-quality bikes and find the perfect one for your adventure."
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Select Dates",
      description: "Pick your preferred rental duration, from a few hours to multiple days."
    },
    {
      icon: <CreditCard className="h-8 w-8 text-primary" />,
      title: "Make Payment",
      description: "Secure and quick payment with multiple options, including local and international methods."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Enjoy Your Ride",
      description: "Collect your bike and start your adventure with our safety guaranteed bikes."
    }
  ];

  const featuredBikes = BIKES.filter(bike => bike.available).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(/bikes/hero-bg.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10"></div>

        <div className="container relative z-20 px-6 text-center text-white">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
                Discover the Freedom of Two Wheels
              </h1>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <p className="text-lg md:text-xl opacity-90 mb-10">
                Premium bike rentals for all your adventures. Explore Nepal and beyond with our quality bikes.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Link to="/bikes">
                <Button size="lg" className="rounded-full px-8 py-6 text-base bg-white text-primary hover:bg-white/90 transition-all btn-hover-effect">
                  Browse Bikes
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-background">
        <div className="container px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpVariants}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Renting a bike with us is simple and straightforward. Follow these four easy steps to get started.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stepsData.map((step, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: index * 0.1 }
                  }
                }}
              >
                <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">{step.icon}</div>
                    <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Bikes */}
      <section className="py-20 bg-muted/30">
        <div className="container px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpVariants}
            className="flex justify-between items-center mb-10"
          >
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">Featured Bikes</h2>
              <p className="text-muted-foreground">
                Our selection of premium bikes for your next adventure
              </p>
            </div>
            <Link to="/bikes">
              <Button variant="outline" className="hidden md:flex items-center">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBikes.map((bike, index) => (
              <motion.div
                key={bike.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.5, delay: index * 0.1 }
                  }
                }}
              >
                <BikeCard bike={bike} />
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link to="/bikes">
              <Button>View All Bikes</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={cardVariants}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-lg opacity-90 mb-10">
              Whether you're exploring the city or hitting the mountain trails, we have the perfect bike for you.
            </p>
            <Link to="/bikes">
              <Button size="lg" className="rounded-full px-8 py-6 bg-white text-primary hover:bg-white/90 btn-hover-effect">
                Book Your Bike Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
