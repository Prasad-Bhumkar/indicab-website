'use client';

import _Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import {
    CorporatePackageCard,
    HourlyPackageCard,
    TourPackageCard
} from '@/components/packages';
import _FloatingActionButton from '@/components/shared/FloatingActionButton';
import { useState } from 'react';
import styles from './packages.module.css';

const _cities = [
  'All Cities',
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Chennai',
  'Hyderabad',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Jaipur'
];

export default function Packages() {
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [activeTab, setActiveTab] = useState('hourly');

  const _hourlyPackages = require('@/data/hourly-packages.json');
  const _tourPackages = require('@/data/tour-packages.json');
  const _corporatePackages = require('@/data/corporate-packages.json');
  const faqs = require('@/data/faqs.json');

  const _filteredHourlyPackages = _hourlyPackages.filter(
    pkg => pkg.availableCities.includes(selectedCity)
  );

  return (
    <main>
      <Header />

      <div className="bg-gradient-to-b from-green-800 to-green-700 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel Packages</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-6">
            Choose from our range of flexible packages designed for every travel need
          </p>
          <div className="w-20 h-1 bg-orange-500 rounded-full mx-auto" />
        </div>
      </div>

      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-2 space-x-4">
            <button
              type="button"
              onClick={() => setActiveTab('hourly')}
              className={`px-4 py-2 font-medium whitespace-nowrap ${
                activeTab === 'hourly'
                  ? 'text-green-700 border-b-2 border-green-700'
                  : 'text-gray-600 hover:text-green-700'
              }`}
            >
              Hourly Packages
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('tour')}
              className={`px-4 py-2 font-medium whitespace-nowrap ${
                activeTab === 'tour'
                  ? 'text-green-700 border-b-2 border-green-700'
                  : 'text-gray-600 hover:text-green-700'
              }`}
            >
              Tour Packages
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('corporate')}
              className={`px-4 py-2 font-medium whitespace-nowrap ${
                activeTab === 'corporate'
                  ? 'text-green-700 border-b-2 border-green-700'
                  : 'text-gray-600 hover:text-green-700'
              }`}
            >
              Corporate Solutions
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'hourly' && (
        <div className={styles.tabContent}>
          <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-center text-green-800 mb-6">Hourly Rental Packages</h2>
              <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
                Flexible hourly packages with professional drivers for all your local travel needs.
              </p>
              <div className={styles.cityFilter}>
                {_cities.map(city => (
                  <button
                    type="button"
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-4 py-1 rounded-full text-sm ${
                      selectedCity === city
                        ? 'bg-green-600 text-white'
                        : 'bg-green-50 text-green-800 hover:bg-green-100'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.packageGrid}>
              {_filteredHourlyPackages.map(pkg => (
                <HourlyPackageCard key={pkg.id} package={pkg} />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tour' && (
        <div className={styles.tabContent}>
          <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-center text-green-800 mb-6">Tour Packages</h2>
              <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
                Discover India's most beautiful destinations with our curated tour packages.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {_tourPackages.map(pkg => (
                <TourPackageCard key={pkg.id} package={pkg} />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'corporate' && (
        <div className={styles.tabContent}>
          <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-center text-green-800 mb-6">Corporate Transportation Solutions</h2>
              <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
                Reliable transportation services designed for businesses of all sizes.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {_corporatePackages.map(pkg => (
                <CorporatePackageCard key={pkg.id} package={pkg} />
              ))}
            </div>
          </div>
        </div>
      )}

      <_Footer />
      <_FloatingActionButton />
    </main>
  );
}