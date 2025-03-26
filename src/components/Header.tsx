"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'; // Corrected import path
import { Menu } from 'lucide-react';
import Logo from './Logo';
import RouteSearch from './RouteSearch';
import DarkModeToggle from './DarkModeToggle';

const Header = React.memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Set mounted state once on component initialization
  useEffect(() => {
    setMounted(true);

    // Add scroll event listener to show/hide shadow
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation links with prefetch configuration
  const navLinks = [
    { name: 'Book Cab', href: '/', prefetch: true },
    { name: 'About us', href: '/about', prefetch: true },
    { name: 'Services', href: '/services', prefetch: true },
    { name: 'Business Travel', href: '/business', prefetch: true },
    { name: 'Packages', href: '/packages', prefetch: true },
    { name: 'Blog', href: '/blog', prefetch: true },
    { name: 'Pricing', href: '/pricing', prefetch: true },
    { name: 'Guides', href: '/guides', prefetch: true },
    { name: 'Drivers', href: '/drivers', prefetch: true },
    { name: 'Contact us', href: '/contact', prefetch: true },
    { name: 'Help', href: '/help', prefetch: true },
    { name: 'Download APP', href: '#mobileApp', prefetch: false }, // No prefetch needed for hash links
    { name: 'Login', href: '/auth', prefetch: true },
  ];

  return (
    <header className={`w-full bg-primary dark:bg-gray-900 py-2 sticky top-0 z-40 transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center" prefetch={true}>
            <Logo />
          </Link>
        </div>

        {/* Route Search - Hidden on mobile */}
        <div className="hidden md:block flex-1 max-w-md mx-4">
          <RouteSearch />
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden md:flex space-x-2 items-center">
          {navLinks.slice(0, 8).map((item) => (
            <Link
              key={item.name}
              href={item.href as any} // Temporarily cast to any to resolve type error
              className="text-xs font-medium text-white hover:text-orange-200 transition-colors px-2 py-1"
              prefetch={item.prefetch}
            >
              {item.name}
            </Link>
          ))}
          <div className="relative group">
            <button className="text-xs font-medium text-white hover:text-orange-200 transition-colors px-2 py-1">
              More
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-sm py-1 hidden group-hover:block z-50">
              {navLinks.slice(8).map((item) => (
                <Link
                  key={item.name}
                  href={item.href as any} // Temporarily cast to any to resolve type error
                  className="block px-4 py-2 text-xs text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white dark:hover:bg-primary/80"
                  prefetch={item.prefetch}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <div className="ml-2">
            <DarkModeToggle />
          </div>
        </nav>

        {/* Mobile Menu Icon and Dark Mode Toggle */}
        <div className="md:hidden flex items-center space-x-2">
          <DarkModeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <button className="p-1">
                <Menu className="h-5 w-5 text-white" />
                <span className="sr-only">Toggle menu</span>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] dark:bg-gray-900 dark:text-white">
              <div className="pt-6 pb-2 mb-6 border-b dark:border-gray-700">
                <div className="flex items-center justify-center gap-2">
                  {mounted ? (
                    <Image
                      src="/indicab-logo.svg"
                      alt="IndiCab Logo"
                      width={25}
                      height={25}
                    />
                  ) : (
                    <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-sm animate-pulse"></div>
                  )}
                  <span className="text-xl font-bold text-primary dark:text-white">IndiCab</span>
                </div>
              </div>
              <div className="mb-6">
                <RouteSearch />
              </div>
              <nav className="flex flex-col space-y-4">
                {navLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href as any} // Temporarily cast to any to resolve type error
                    className={`text-sm font-medium transition-colors hover:text-primary dark:hover:text-orange-400 ${item.name === 'Login' ? 'text-primary dark:text-orange-400 font-semibold' : 'text-gray-700 dark:text-gray-300'}`}
                    onClick={() => setIsMenuOpen(false)}
                    prefetch={item.prefetch}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
});

export default Header;
