import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PricingCalculator from '@/components/features/booking/PricingCalculator';
import FloatingActionButton from '@/components/shared/FloatingActionButton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'IndiCab - Fare Calculator | Estimate Your Cab Fare',
    description: 'Calculate the estimated fare for your intercity cab journey with IndiCab\'s pricing calculator. Get transparent fare estimates for any route in India.',
    keywords: ['cab fare', 'pricing calculator', 'intercity taxi fare', 'cab cost estimator', 'india taxi rates'],
    openGraph: {
        title: 'IndiCab - Fare Calculator | Estimate Your Cab Fare',
        description: 'Calculate the estimated fare for your intercity cab journey with IndiCab\'s pricing calculator.',
        images: ['/indicab-logo.png'],
        type: 'website',
    },
};

export default function Pricing(): JSX.Element {
    return (
        <main>
            <Header />

            <div className="bg-gradient-to-b from-green-800 to-green-700 py-16 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Fare Calculator</h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-6">
                        Get transparent fare estimates for your intercity travel with our pricing calculator
                    </p>
                    <div className="w-20 h-1 bg-orange-500 rounded-full mx-auto"></div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <PricingCalculator />
                    </div>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="bg-green-100 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Transparent Pricing</h3>
                            <p className="text-gray-600">
                                We believe in complete transparency. Our fare calculator provides accurate estimates with a breakdown of all charges.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="bg-green-100 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">No Hidden Charges</h3>
                            <p className="text-gray-600">
                                What you see is what you pay. We don't surprise you with additional charges or surge pricing after the ride.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="bg-green-100 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Multiple Payment Options</h3>
                            <p className="text-gray-600">
                                Pay with your preferred method - card, digital wallets, or cash. We offer convenient payment options for all travelers.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 bg-gray-50 rounded-lg p-8">
                        <h2 className="text-2xl font-bold text-green-800 mb-6">Frequently Asked Questions</h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium text-green-700 mb-2">How accurate is the fare calculator?</h3>
                                <p className="text-gray-600">
                                    Our fare calculator provides estimates based on the standard rates and expected route. The actual fare may vary slightly due to route changes, waiting time, or toll charges.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-green-700 mb-2">Are toll charges included in the estimate?</h3>
                                <p className="text-gray-600">
                                    Yes, toll charges for the standard route are included in the fare estimate. Any additional tolls due to route changes will be added to the final fare.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-green-700 mb-2">Do you charge for waiting time?</h3>
                                <p className="text-gray-600">
                                    A standard waiting time of 15 minutes is complimentary. Beyond that, waiting charges apply at ₹100 per hour, calculated on a per-minute basis.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-green-700 mb-2">Is there a cancellation fee?</h3>
                                <p className="text-gray-600">
                                    Cancellations made more than 6 hours before the scheduled pickup time are free. Cancellations within 6 hours incur a charge of 10% of the total fare. Cancellations within 1 hour or no-shows are charged at 25% of the total fare.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
            <FloatingActionButton />
        </main>
    );
}
