import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">About IndiCab</h3>
            <p className="text-sm text-gray-600 mb-4">
              IndiCab is your trusted partner for intercity travel in India. We provide comfortable and reliable cab services across major cities.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="text-gray-600 hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com" className="text-gray-600 hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://instagram.com" className="text-gray-600 hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://youtube.com" className="text-gray-600 hover:text-primary">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/routes" className="text-sm text-gray-600 hover:text-primary">
                  Routes
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="text-sm text-gray-600 hover:text-primary">
                  Vehicles
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Popular Routes</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/routes?from=Mumbai&to=Pune" className="text-sm text-gray-600 hover:text-primary">
                  Mumbai to Pune
                </Link>
              </li>
              <li>
                <Link href="/routes?from=Delhi&to=Agra" className="text-sm text-gray-600 hover:text-primary">
                  Delhi to Agra
                </Link>
              </li>
              <li>
                <Link href="/routes?from=Bangalore&to=Mysore" className="text-sm text-gray-600 hover:text-primary">
                  Bangalore to Mysore
                </Link>
              </li>
              <li>
                <Link href="/routes?from=Chennai&to=Pondicherry" className="text-sm text-gray-600 hover:text-primary">
                  Chennai to Pondicherry
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">
                Email: support@indicab.com
              </li>
              <li className="text-sm text-gray-600">
                Phone: 1800-123-4567
              </li>
              <li className="text-sm text-gray-600">
                Address: 123 Transport Hub,<br />
                Mumbai, Maharashtra 400001
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} IndiCab. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-primary">
                Terms of Service
              </Link>
              <Link href="/faq" className="text-sm text-gray-600 hover:text-primary">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 