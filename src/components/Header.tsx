import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { _Button as Button } from '@/components/ui/Button';

export default function Header(): JSX.Element {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/indicab-logo.png" 
              alt="IndiCab Logo" 
              width={120} 
              height={40} 
              priority
            />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/routes" className="text-sm font-medium hover:text-primary">
              Routes
            </Link>
            <Link href="/vehicles" className="text-sm font-medium hover:text-primary">
              Vehicles
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
} 