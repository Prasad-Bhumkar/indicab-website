"use client";

import React from 'react';
import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';

const popularCities = [
  { name: 'Delhi', href: '/?city=delhi', prefetch: true },
  { name: 'Mumbai', href: '/?city=mumbai', prefetch: true },
  { name: 'Bangalore', href: '/?city=bangalore', prefetch: true },
  { name: 'Chennai', href: '/?city=chennai', prefetch: true },
  { name: 'Kolkata', href: '/?city=kolkata', prefetch: true },
  { name: 'Hyderabad', href: '/?city=hyderabad', prefetch: true },
  { name: 'Pune', href: '/?city=pune', prefetch: true },
  { name: 'Ahmedabad', href: '/?city=ahmedabad', prefetch: true },
  { name: 'Jaipur', href: '/?city=jaipur', prefetch: true },
  { name: 'Lucknow', href: '/?city=lucknow', prefetch: true }
];

const popularRoutes = [
  { name: 'Delhi To Agra', href: '/oneway/delhi-to-agra', prefetch: true },
  { name: 'Mumbai To Pune', href: '/oneway/mumbai-to-pune', prefetch: true },
  { name: 'Bangalore To Mysore', href: '/oneway/bangalore-to-mysore', prefetch: true },
  { name: 'Delhi To Jaipur', href: '/oneway/delhi-to-jaipur', prefetch: true },
  { name: 'Chennai To Pondicherry', href: '/oneway/chennai-to-pondicherry', prefetch: true },
  { name: 'Kolkata To Digha', href: '/oneway/kolkata-to-digha', prefetch: true }
];

const quickLinks = [
  { name: 'Contact Us', href: '/contact', prefetch: true },
  { name: 'About us', href: '/about', prefetch: true },
  { name: 'Routes', href: '/routes', prefetch: true },
  { name: 'Terms and Conditions', href: '/terms', prefetch: true },
  { name: 'Privacy Policy', href: '/privacy', prefetch: true },
  { name: 'Business Travel', href: '/business', prefetch: true }
];

const Footer = () => {
  return (
    <footer className="bg-primary dark:bg-gray-900 text-white border-t dark:border-gray-800">
      <div className="container mx-auto px-4 py-5">
        <div className="mb-4">
          <h3 className="text-xs font-bold mb-1">IndiCab</h3>
          <p className="text-gray-100 dark:text-gray-300 text-[10px] mb-1">INDICAB PRIVATE LIMITED</p>

          <div className="flex items-center mb-1">
            <Phone className="h-3 w-3 mr-1 text-gray-100 dark:text-gray-300" />
            <a href="tel:+919876543210" className="text-gray-100 dark:text-gray-300 text-[10px] hover:text-white transition-colors">
              +91 9876 543 210
            </a>
          </div>

          <div className="flex items-center mb-1">
            <Mail className="h-3 w-3 mr-1 text-gray-100 dark:text-gray-300" />
            <a href="mailto:info@indicab.com" className="text-gray-100 dark:text-gray-300 text-[10px] hover:text-white transition-colors">
              info@indicab.com
            </a>
          </div>
        </div>

        {/* Popular Cities */}
        <div className="mb-4">
          <h3 className="text-xs font-bold mb-1">Popular Cities</h3>
          <div className="grid grid-cols-2 gap-x-1">
            {popularCities.map((city) => (
              <div key={city.name} className="leading-tight mb-1">
                <Link
                  href={city.href}
                  className="text-gray-100 dark:text-gray-300 text-[10px] hover:text-white transition-colors"
                  prefetch={city.prefetch}
                >
                  {city.name}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Routes */}
        <div className="mb-4">
          <h3 className="text-xs font-bold mb-1">Popular Routes</h3>
          <div className="grid grid-cols-2 gap-x-1">
            {popularRoutes.map((route) => (
              <div key={route.name} className="leading-tight mb-1">
                <Link
                  href={route.href}
                  className="text-gray-100 dark:text-gray-300 text-[10px] hover:text-white transition-colors"
                  prefetch={route.prefetch}
                >
                  {route.name}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xs font-bold mb-1">Quick Links</h3>
          <div className="grid grid-cols-2 gap-x-1">
            {quickLinks.map((link) => (
              <div key={link.name} className="leading-tight mb-1">
                <Link
                  href={link.href}
                  className="text-gray-100 dark:text-gray-300 text-[10px] hover:text-white transition-colors"
                  prefetch={link.prefetch}
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-green-800 dark:border-gray-800">
        <div className="container mx-auto px-4 py-2">
          <p className="text-center text-gray-300 dark:text-gray-400 text-[8px]">
            © {new Date().getFullYear()} IndiCab. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
