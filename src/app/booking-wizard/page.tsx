import { Car, Star, Clock, Phone } from 'lucide-react';
import dynamic from 'next/dynamic';
import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';
import * as Sentry from '@sentry/nextjs';

const BookingWizard = dynamic(
  () => import('@/components/features/booking/BookingWizard'),
  {
    ssr: false,
    loading: () => (
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 max-w-4xl mx-auto p-8 flex justify-center">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-32 mb-4"></div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-48 mb-2.5"></div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-40 mb-2.5"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md w-full mt-6"></div>
        </div>
      </div>
    )
  }
);

export default function BookingWizardPage() {
  Sentry.addBreadcrumb({
    category: 'booking',
    message: 'Booking wizard page loaded',
    level: 'info',
  });

  return (
    <>
      <Header />
      <main className="py-10 md:py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Book Your Maharashtra Tour
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our step-by-step booking process makes it easy to plan your journey through Maharashtra.
              Follow the simple steps to book your ideal ride.
            </p>
          </div>

          <BookingWizard />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Car className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Verified Drivers</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Experienced and professional drivers for a safe journey</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Comfortable Vehicles</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Well-maintained fleet of vehicles for a comfortable ride</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Punctual Service</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">On-time pickup and drop-off for a hassle-free experience</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Round-the-clock customer support for assistance</p>
            </div>
          </div>

          <div className="mt-16 max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">What Our Customers Say</h3>
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4">
                <img
                  src="/images/avatars/user-1.jpg"
                  alt="Customer"
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic mb-4 max-w-2xl">
                "We booked a cab from Pune to Mahabaleshwar with IndiCab and had a wonderful experience.
                The booking process was simple, the driver was punctual and professional, and the vehicle was
                comfortable for our family trip. Will definitely use their service again!"
              </p>
              <p className="font-bold text-gray-800 dark:text-gray-200">Priya Sharma</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Mumbai</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
