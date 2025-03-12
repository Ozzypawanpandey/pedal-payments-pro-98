
import React from 'react';
import { Link } from 'react-router-dom';
import { Bike, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';

const Footer = () => {
  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand and Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Bike className="h-6 w-6" />
              <span className="font-bold text-lg">PedalPro</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Premium bike rentals for every adventure. Experience the joy of cycling with our well-maintained fleet.
            </p>
            <div className="flex space-x-4">
              <a href={CONTACT_INFO.socialMedia.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors duration-200" />
              </a>
              <a href={CONTACT_INFO.socialMedia.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors duration-200" />
              </a>
              <a href={CONTACT_INFO.socialMedia.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors duration-200" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-base mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground text-sm hover:text-primary transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/bikes" className="text-muted-foreground text-sm hover:text-primary transition-colors duration-200">
                  Our Bikes
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground text-sm hover:text-primary transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground text-sm hover:text-primary transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/bookings" className="text-muted-foreground text-sm hover:text-primary transition-colors duration-200">
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-medium text-base mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-muted-foreground mr-2 shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-muted-foreground mr-2 shrink-0" />
                <span className="text-muted-foreground text-sm">{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-muted-foreground mr-2 shrink-0" />
                <span className="text-muted-foreground text-sm">{CONTACT_INFO.email}</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-medium text-base mb-4">Opening Hours</h3>
            <p className="text-muted-foreground text-sm">
              {CONTACT_INFO.hours}
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 mt-8 border-t border-border text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} PedalPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
