
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Bike, Menu, X, User, ShoppingBag, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/bikes', label: 'Bikes' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4',
        isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-6 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
        >
          <Bike className="h-8 w-8" />
          <span className="font-bold text-xl">PedalPro</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                location.pathname === item.path 
                  ? 'text-primary' 
                  : 'text-muted-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Account and Bookings */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />

          <Link to="/bookings">
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
            </Button>
          </Link>

          <Link to="/login">
            <Button variant="ghost" size="sm" className="rounded-full px-4">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
          </Link>

          <Link to="/signup">
            <Button variant="default" size="sm" className="rounded-full px-4">
              <User className="h-4 w-4 mr-2" />
              Signup
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-6 py-4 space-y-4 bg-background/90 backdrop-blur-md shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'block py-2 text-sm font-medium transition-colors',
                  location.pathname === item.path 
                    ? 'text-primary' 
                    : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex space-x-4 pt-2 border-t border-border">
              <Link to="/bookings" className="flex items-center text-sm font-medium py-2">
                <ShoppingBag className="h-4 w-4 mr-2" />
                My Bookings
              </Link>
              <Link to="/login" className="flex items-center text-sm font-medium py-2">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Link>
              <Link to="/signup" className="flex items-center text-sm font-medium py-2">
                <User className="h-4 w-4 mr-2" />
                Signup
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
