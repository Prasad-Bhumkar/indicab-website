"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Lock, Mail, Phone, ArrowRight, Check } from 'lucide-react';
import Header from '@/components/layout/header/Header';
import _Footer from '@/components/layout/footer/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

type FormErrorType = {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    general?: string;
};

const _AuthPage = (): JSX.Element => {
    const _router = useRouter();
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [signupForm, setSignupForm] = useState({ name: '', email: '', phone: '', password: '' });
    const [loginErrors, setLoginErrors] = useState<FormErrorType>({});
    const [signupErrors, setSignupErrors] = useState<FormErrorType>({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const _handleLoginSubmit = (_e: React.FormEvent) => {
        _e.preventDefault();
        setLoginErrors({});
        setLoading(true);

        // Simple form validation
        const errors: FormErrorType = {};
        if (!loginForm.email) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(loginForm.email)) errors.email = 'Please enter a valid email';

        if (!loginForm.password) errors.password = 'Password is required';
        else if (loginForm.password.length < 6) errors.password = 'Password must be at least 6 characters';

        if (Object.keys(errors).length > 0) {
            setLoginErrors(errors);
            setLoading(false);
            return;
        }

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSuccessMessage('Login successful! Redirecting...');
            setTimeout(() => {
                _router.push('/');
            }, 1500);
        }, 1000);
    };

    const _handleSignupSubmit = (_e: React.FormEvent) => {
        _e.preventDefault();
        setSignupErrors({});
        setLoading(true);

        // Simple form validation
        const errors: FormErrorType = {};
        if (!signupForm.name) errors.name = 'Name is required';

        if (!signupForm.email) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(signupForm.email)) errors.email = 'Please enter a valid email';

        if (!signupForm.phone) errors.phone = 'Phone number is required';
        else if (!/^\d{10}$/.test(signupForm.phone)) errors.phone = 'Please enter a valid 10-digit phone number';

        if (!signupForm.password) errors.password = 'Password is required';
        else if (signupForm.password.length < 6) errors.password = 'Password must be at least 6 characters';

        if (Object.keys(errors).length > 0) {
            setSignupErrors(errors);
            setLoading(false);
            return;
        }

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSuccessMessage('Account created successfully! Redirecting to login...');
            setTimeout(() => {
                setActiveTab('login');
                setSuccessMessage('');
            }, 1500);
        }, 1000);
    };

    const handleLoginChange = (_e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = _e.target;
        setLoginForm(_prev => ({ ..._prev, [name]: value }));
    };

    const handleSignupChange = (_e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = _e.target;
        setSignupForm(_prev => ({ ..._prev, [name]: value }));
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <Card className="max-w-md mx-auto overflow-hidden">
                        <div className="flex border-b border-gray-200">
                            <button
                                className={`flex-1 py-3 text-center font-medium text-sm ${activeTab === 'login'
                                        ? 'text-primary border-b-2 border-primary'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                onClick={() => setActiveTab('login')}
                            >
                                Login
                            </button>
                            <button
                                className={`flex-1 py-3 text-center font-medium text-sm ${activeTab === 'signup'
                                        ? 'text-primary border-b-2 border-primary'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                onClick={() => setActiveTab('signup')}
                            >
                                Sign Up
                            </button>
                        </div>

                        <div className="p-6">
                            {successMessage && (
                                <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg flex items-center">
                                    <Check className="h-5 w-5 mr-2" />
                                    <p>{successMessage}</p>
                                </div>
                            )}

                            {activeTab === 'login' ? (
                                <form onSubmit={_handleLoginSubmit}>
                                    <h2 className="text-xl font-bold mb-4 text-gray-800">Welcome Back</h2>
                                    <p className="text-gray-600 text-sm mb-6">Log in to access your IndiCab account</p>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Email</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={loginForm.email}
                                                    onChange={handleLoginChange}
                                                    className={`w-full pl-10 pr-3 py-2 border rounded-lg ${loginErrors.email ? 'border-red-500' : 'border-gray-200'
                                                        }`}
                                                    placeholder="Enter your email"
                                                />
                                            </div>
                                            {loginErrors.email && (
                                                <p className="mt-1 text-red-500 text-xs">{loginErrors.email}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1">Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                <input
                                                    type="password"
                                                    name="password"
                                                    value={loginForm.password}
                                                    onChange={handleLoginChange}
                                                    className={`w-full pl-10 pr-3 py-2 border rounded-lg ${loginErrors.password ? 'border-red-500' : 'border-gray-200'
                                                        }`}
                                                    placeholder="Enter your password"
                                                />
                                            </div>
                                            {loginErrors.password && (
                                                <p className="mt-1 text-red-500 text-xs">{loginErrors.password}</p>
                                            )}
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="remember"
                                                    className="h-4 w-4 text-primary border-gray-300 rounded"
                                                />
                                                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                                                    Remember me
                                                </label>
                                            </div>

                                            <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                                                Forgot password?
                                            </Link>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full bg-primary hover:bg-primary/90 text-white py-2"
                                            disabled={loading}
                                        >
                                            {loading ? 'Logging in...' : 'Login'}
                                        </Button>

                                        <div className="text-center text-sm text-gray-500">
                                            Don&apos;t have an account?{' '}
                                            <button
                                                type="button"
                                                className="text-primary hover:underline"
                                                onClick={() => setActiveTab('signup')}
                                            >
                                                Sign up
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            ) : (
                                <form onSubmit={_handleSignupSubmit}>
                                    <h2 className="text-xl font-bold mb-4 text-gray-800">Create Account</h2>
                                    <p className="text-gray-600 text-sm mb-6">Join IndiCab for the best cab experience</p>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={signupForm.name}
                                                    onChange={handleSignupChange}
                                                    className={`w-full pl-10 pr-3 py-2 border rounded-lg ${signupErrors.name ? 'border-red-500' : 'border-gray-200'
                                                        }`}
                                                    placeholder="Enter your full name"
                                                />
                                            </div>
                                            {signupErrors.name && (
                                                <p className="mt-1 text-red-500 text-xs">{signupErrors.name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1">Email</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={signupForm.email}
                                                    onChange={handleSignupChange}
                                                    className={`w-full pl-10 pr-3 py-2 border rounded-lg ${signupErrors.email ? 'border-red-500' : 'border-gray-200'
                                                        }`}
                                                    placeholder="Enter your email"
                                                />
                                            </div>
                                            {signupErrors.email && (
                                                <p className="mt-1 text-red-500 text-xs">{signupErrors.email}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1">Phone Number</label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={signupForm.phone}
                                                    onChange={handleSignupChange}
                                                    className={`w-full pl-10 pr-3 py-2 border rounded-lg ${signupErrors.phone ? 'border-red-500' : 'border-gray-200'
                                                        }`}
                                                    placeholder="Enter your phone number"
                                                />
                                            </div>
                                            {signupErrors.phone && (
                                                <p className="mt-1 text-red-500 text-xs">{signupErrors.phone}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1">Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                <input
                                                    type="password"
                                                    name="password"
                                                    value={signupForm.password}
                                                    onChange={handleSignupChange}
                                                    className={`w-full pl-10 pr-3 py-2 border rounded-lg ${signupErrors.password ? 'border-red-500' : 'border-gray-200'
                                                        }`}
                                                    placeholder="Create a password"
                                                />
                                            </div>
                                            {signupErrors.password && (
                                                <p className="mt-1 text-red-500 text-xs">{signupErrors.password}</p>
                                            )}
                                        </div>

                                        <div className="flex items-start">
                                            <input
                                                type="checkbox"
                                                id="terms"
                                                className="h-4 w-4 mt-1 text-primary border-gray-300 rounded"
                                            />
                                            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                                                I agree to the{' '}
                                                <Link href="/terms" className="text-primary hover:underline">
                                                    Terms of Service
                                                </Link>{' '}
                                                and{' '}
                                                <Link href="/privacy" className="text-primary hover:underline">
                                                    Privacy Policy
                                                </Link>
                                            </label>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full bg-primary hover:bg-primary/90 text-white py-2"
                                            disabled={loading}
                                        >
                                            {loading ? 'Creating account...' : 'Create Account'}
                                        </Button>

                                        <div className="text-center text-sm text-gray-500">
                                            Already have an account?{' '}
                                            <button
                                                type="button"
                                                className="text-primary hover:underline"
                                                onClick={() => setActiveTab('login')}
                                            >
                                                Login
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>
                    </Card>
                </div>
            </main>

            <_Footer />
        </div>
    );
};

export default _AuthPage;
