import type { Metadata, Viewport } from 'next';
import ContactForm from '@/components/ContactForm';
import ContactMap from '@/components/ContactMap';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActionButton from '@/components/FloatingActionButton';

export const viewport: Viewport = {
  themeColor: '#0c9242',
};

export const metadata: Metadata = {
  title: 'Contact Us | IndiCab - Trusted Indian Cab Booking Service',
  description: 'Get in touch with IndiCab for cab bookings, inquiries, and support. Available 24/7 to assist you with all your transportation needs across India.',
  keywords: ['contact', 'support', 'cab booking', 'inquiry', 'India', 'help', 'customer service'],
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-4 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 pt-4">Contact Us</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-primary mb-4">Reach Out to Us</h2>
              <p className="text-gray-600 mb-6">
                We're here to help with all your transportation needs. Reach out to us for bookings, inquiries, or support.
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Phone Support</h3>
                    <p className="text-gray-600">24/7 Customer Service</p>
                    <a href="tel:+919876543210" className="text-primary font-medium">+91 9876 543 210</a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Email Support</h3>
                    <p className="text-gray-600">We'll respond within 24 hours</p>
                    <a href="mailto:info@indicab.com" className="text-primary font-medium">info@indicab.com</a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Head Office</h3>
                    <p className="text-gray-600">123 Transport Plaza, MG Road</p>
                    <p className="text-gray-600">Bangalore, Karnataka 560001</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-medium text-gray-800 mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-primary/10 p-2 rounded-full text-primary hover:bg-primary hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 3.1c-.8.4-1.6.6-2.5.8.9-.5 1.6-1.4 1.9-2.4-.8.5-1.8.9-2.7 1.1-.8-.8-1.9-1.3-3.1-1.3-2.3 0-4.2 1.9-4.2 4.2 0 .3 0 .6.1.9-3.5-.2-6.6-1.9-8.7-4.4-.4.6-.6 1.4-.6 2.1 0 1.5.8 2.8 1.9 3.5-.7 0-1.4-.2-2-.5 0 2.1 1.5 3.8 3.4 4.2-.4.1-.7.2-1.1.2-.3 0-.5 0-.8-.1.5 1.7 2.1 2.9 3.9 3-1.4 1.1-3.2 1.8-5.1 1.8-.3 0-.7 0-1-.1 1.8 1.2 4 1.9 6.3 1.9 7.6 0 11.8-6.3 11.8-11.8v-.5c.8-.6 1.5-1.3 2-2.2z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-primary/10 p-2 rounded-full text-primary hover:bg-primary hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.9 8.2v-.2c0-1.4-1.3-3.4-3.3-3.4h-13.2c-2 0-3.4 2-3.4 3.6v9.8c0 1.6 1.4 3.6 3.4 3.6h13.3c2 0 3.3-2 3.3-3.6v-9.8zm-17.1-1.6h14.3c.3 0 .5.1.8.3l-8 5.8-8 .1c.3-.3.6-.4.9-.4zm16.1 11.3c0 .8-.7 1.6-1.5 1.6h-13.2c-.9 0-1.5-.8-1.5-1.6v-8.3l8 5.1 8.2-5.3v8.5z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-primary/10 p-2 rounded-full text-primary hover:bg-primary hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.1c2.7 0 3 0 4.1.1 1 0 1.5.2 1.9.3.5.2.8.4 1.1.7s.5.6.7 1.1c.1.4.3.9.3 1.9.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c0 1-.2 1.5-.3 1.9-.2.5-.4.8-.7 1.1-.3.3-.6.5-1.1.7-.4.1-.9.3-1.9.3-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1 0-1.5-.2-1.9-.3-.5-.2-.8-.4-1.1-.7s-.5-.6-.7-1.1c-.1-.4-.3-.9-.3-1.9-.1-1.1-.1-1.4-.1-4.1s0-3 .1-4.1c0-1 .2-1.5.3-1.9.2-.5.4-.8.7-1.1.3-.3.6-.5 1.1-.7.4-.1.9-.3 1.9-.3 1.1-.1 1.4-.1 4.1-.1zm0-1.8c-2.7 0-3.1 0-4.2.1-1.1 0-1.8.2-2.5.5-.7.3-1.2.6-1.8 1.2-.6.6-.9 1.1-1.2 1.8-.3.7-.5 1.4-.5 2.5-.1 1.1-.1 1.4-.1 4.2s0 3.1.1 4.2c0 1.1.2 1.8.5 2.5.3.7.6 1.2 1.2 1.8.6.6 1.1.9 1.8 1.2.7.3 1.4.5 2.5.5 1.1.1 1.4.1 4.2.1s3.1 0 4.2-.1c1.1 0 1.8-.2 2.5-.5.7-.3 1.2-.6 1.8-1.2.6-.6.9-1.1 1.2-1.8.3-.7.5-1.4.5-2.5.1-1.1.1-1.4.1-4.2s0-3.1-.1-4.2c0-1.1-.2-1.8-.5-2.5-.3-.7-.6-1.2-1.2-1.8-.6-.6-1.1-.9-1.8-1.2-.7-.3-1.4-.5-2.5-.5-1.1-.1-1.5-.1-4.2-.1z"/><path d="M12 5.8c-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2 6.2-2.8 6.2-6.2-2.8-6.2-6.2-6.2zm0 10.2c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/><circle cx="18.4" cy="5.6" r="1.4"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-primary/10 p-2 rounded-full text-primary hover:bg-primary hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 3H4c-.6 0-1 .4-1 1v16c0 .6.4 1 1 1h16c.6 0 1-.4 1-1V4c0-.6-.4-1-1-1zM8.3 19H5V8.6h3.3V19zM6.6 7.4c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8 1.8.8 1.8 1.8-.8 1.8-1.8 1.8zM19 19h-3.3v-5.1c0-1.2-.4-2.1-1.5-2.1-.8 0-1.3.6-1.5 1.1-.1.2-.1.4-.1.6V19h-3.3V8.6h3.3v1.4c.5-.7 1.3-1.6 3.2-1.6 2.3 0 4 1.5 4 4.7V19z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-10">
            <h2 className="text-xl font-semibold text-primary mb-4">Our Location</h2>
            <div className="h-[400px] w-full rounded-lg overflow-hidden border border-gray-200">
              <ContactMap />
            </div>
          </div>

          {/* FAQs Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-primary mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">How do I book a cab?</h3>
                <p className="text-gray-600">You can book a cab through our website, mobile app, or by calling our customer service team at +91 9876 543 210. We offer one-way, round trip, and rental options.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600">We accept all major credit/debit cards, UPI payments, mobile wallets, and cash payments to the driver after your journey.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">How can I cancel my booking?</h3>
                <p className="text-gray-600">You can cancel your booking through our app or website up to 1 hour before the scheduled pickup time. Cancellation fees may apply based on how close to departure you cancel.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Are your drivers verified?</h3>
                <p className="text-gray-600">Yes, all our drivers undergo thorough background checks, verification, and training before joining our platform. We prioritize your safety and comfort.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingActionButton />
    </>
  );
}
