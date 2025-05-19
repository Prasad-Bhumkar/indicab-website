"use client";

import { CheckCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const _DriverApplicationForm = (): JSX.Element => {
    const [currentStep, setCurrentStep] = useState(1);
    const [applicationSubmitted, setApplicationSubmitted] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        // Personal Information
        fullName: '',
        email: '',
        phone: '',
        age: '',
        address: '',
        city: '',
        pincode: '',

        // Vehicle Information
        vehicleType: 'sedan',
        vehicleMake: '',
        vehicleModel: '',
        vehicleYear: '',
        registrationNumber: '',

        // Experience Information
        drivingExperience: '',
        licenseNumber: '',
        licenseValidity: '',
        previousCompany: '',
        preferredArea: '',
        referralCode: '',
    });

    // Handle form input changes
    const handleChange = (_e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = _e.target;
        setFormData(_prev => ({ ..._prev, [name]: value }));
    };

    // Handle form submission
    const _handleSubmit = (_e: React.FormEvent) => {
        _e.preventDefault();
        setApplicationSubmitted(true);
        // In a real app, you would send this data to a server
        console.log('Application form data:', formData);
    };

    // Move to next step
    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    // Move to previous step
    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    // Render the form based on current step
    const _renderForm = (): JSX.Element => {
        switch (currentStep) {
            case 1:
                return (
                    <div>
                        <h3 className="text-xl font-bold text-green-800 mb-6">Personal Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                                    Age *
                                </label>
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    min="21"
                                    max="65"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">Must be at least 21 years old</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                Current Address *
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                required
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                    City *
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                                    PIN Code *
                                </label>
                                <input
                                    type="text"
                                    id="pincode"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    pattern="[0-9]{6}"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <_Button
                                type="button"
                                onClick={nextStep}
                                className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md font-medium transition-colors"
                            >
                                Next: Vehicle Information
                            </_Button>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div>
                        <h3 className="text-xl font-bold text-green-800 mb-6">Vehicle Information</h3>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Vehicle Type *
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {['sedan', 'suv', 'luxury', 'hatchback'].map((type): JSX.Element => (
                                    <div
                                        key={type}
                                        className={`border rounded-md p-3 cursor-pointer text-center transition-colors ${formData.vehicleType === type ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'
                                            }`}
                                        onClick={() => setFormData({ ...formData, vehicleType: type })}
                                    >
                                        <span className="capitalize font-medium">{type}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="vehicleMake" className="block text-sm font-medium text-gray-700 mb-1">
                                    Vehicle Make *
                                </label>
                                <input
                                    type="text"
                                    id="vehicleMake"
                                    name="vehicleMake"
                                    value={formData.vehicleMake}
                                    onChange={handleChange}
                                    placeholder="e.g., Toyota, Honda, Maruti"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="vehicleModel" className="block text-sm font-medium text-gray-700 mb-1">
                                    Vehicle Model *
                                </label>
                                <input
                                    type="text"
                                    id="vehicleModel"
                                    name="vehicleModel"
                                    value={formData.vehicleModel}
                                    onChange={handleChange}
                                    placeholder="e.g., Innova, City, Swift"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="vehicleYear" className="block text-sm font-medium text-gray-700 mb-1">
                                    Vehicle Year *
                                </label>
                                <input
                                    type="number"
                                    id="vehicleYear"
                                    name="vehicleYear"
                                    value={formData.vehicleYear}
                                    onChange={handleChange}
                                    min="2016"
                                    max={new Date().getFullYear()}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">Vehicle should not be older than 7 years</p>
                            </div>

                            <div>
                                <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                    Registration Number *
                                </label>
                                <input
                                    type="text"
                                    id="registrationNumber"
                                    name="registrationNumber"
                                    value={formData.registrationNumber}
                                    onChange={handleChange}
                                    placeholder="e.g., MH01AB1234"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <_Button
                                type="button"
                                onClick={prevStep}
                                className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 py-2 px-6 rounded-md font-medium transition-colors"
                            >
                                Back
                            </_Button>
                            <_Button
                                type="button"
                                onClick={nextStep}
                                className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md font-medium transition-colors"
                            >
                                Next: Experience
                            </_Button>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div>
                        <h3 className="text-xl font-bold text-green-800 mb-6">Experience Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="drivingExperience" className="block text-sm font-medium text-gray-700 mb-1">
                                    Years of Driving Experience *
                                </label>
                                <input
                                    type="number"
                                    id="drivingExperience"
                                    name="drivingExperience"
                                    value={formData.drivingExperience}
                                    onChange={handleChange}
                                    min="3"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">Minimum 3 years of experience required</p>
                            </div>

                            <div>
                                <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                    Driving License Number *
                                </label>
                                <input
                                    type="text"
                                    id="licenseNumber"
                                    name="licenseNumber"
                                    value={formData.licenseNumber}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="licenseValidity" className="block text-sm font-medium text-gray-700 mb-1">
                                    License Valid Until *
                                </label>
                                <input
                                    type="date"
                                    id="licenseValidity"
                                    name="licenseValidity"
                                    value={formData.licenseValidity}
                                    onChange={handleChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="previousCompany" className="block text-sm font-medium text-gray-700 mb-1">
                                    Previous Company (if any)
                                </label>
                                <input
                                    type="text"
                                    id="previousCompany"
                                    name="previousCompany"
                                    value={formData.previousCompany}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="preferredArea" className="block text-sm font-medium text-gray-700 mb-1">
                                    Preferred Area of Operation *
                                </label>
                                <div className="relative">
                                    <select
                                        id="preferredArea"
                                        name="preferredArea"
                                        value={formData.preferredArea}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
                                        required
                                    >
                                        <option value="">Select an option</option>
                                        <option value="Mumbai">Mumbai</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Bangalore">Bangalore</option>
                                        <option value="Chennai">Chennai</option>
                                        <option value="Hyderabad">Hyderabad</option>
                                        <option value="Pune">Pune</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700 mb-1">
                                    Referral Code (if any)
                                </label>
                                <input
                                    type="text"
                                    id="referralCode"
                                    name="referralCode"
                                    value={formData.referralCode}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                    required
                                />
                                <span className="ml-2 text-sm text-gray-700">
                                    I agree to the <a href="/terms" className="text-green-600 hover:underline">Terms and Conditions</a> and <a href="/privacy" className="text-green-600 hover:underline">Privacy Policy</a> *
                                </span>
                            </label>
                        </div>

                        <div className="flex justify-between">
                            <_Button
                                type="button"
                                onClick={prevStep}
                                className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 py-2 px-6 rounded-md font-medium transition-colors"
                            >
                                Back
                            </_Button>
                            <_Button
                                type="submit"
                                className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-md font-medium transition-colors"
                            >
                                Submit Application
                            </_Button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    // Success message after form submission
    const _renderSuccessMessage = (): JSX.Element => {
        return (
            <div className="py-10 px-4 text-center">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-4">Application Submitted Successfully!</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Thank you for your interest in joining IndiCab as a driver partner. Our team will review your application and contact you within 48 hours.
                </p>
                <p className="text-gray-600 mb-6">
                    Application Reference: <span className="font-medium">{`INX${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`}</span>
                </p>
                <_Button
                    type="button"
                    onClick={() => window.location.href = '/'}
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md font-medium transition-colors"
                >
                    Return to Home
                </_Button>
            </div>
        );
    };

    return (
        <div className="p-6 lg:p-8">
            {/* Progress bar */}
            {!applicationSubmitted && (
                <div className="mb-8">
                    <div className="flex justify-between">
                        <div className="text-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1 ${currentStep >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                1
                            </div>
                            <span className="text-xs text-gray-500">Personal Info</span>
                        </div>
                        <div className="flex-1 flex items-center px-2">
                            <div className={`h-1 w-full ${currentStep >= 2 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
                        </div>
                        <div className="text-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1 ${currentStep >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                2
                            </div>
                            <span className="text-xs text-gray-500">Vehicle</span>
                        </div>
                        <div className="flex-1 flex items-center px-2">
                            <div className={`h-1 w-full ${currentStep >= 3 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
                        </div>
                        <div className="text-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1 ${currentStep >= 3 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                3
                            </div>
                            <span className="text-xs text-gray-500">Experience</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Form or success message */}
            {applicationSubmitted ? (
                _renderSuccessMessage()
            ) : (
                <form onSubmit={_handleSubmit}>
                    {_renderForm()}
                </form>
            )}
        </div>
    );
};

export default _DriverApplicationForm;
