"use client";

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Settings,
    Moon,
    Sun,
    Globe,
    DollarSign,
    ChevronDown,
    Check
} from 'lucide-react';
import {
    _Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    _DialogTrigger
} from '../../ui/dialog/dialog';
import { Button } from '../../ui/Button';
import {
    _DropdownMenu,
    DropdownMenuContent,
    _DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    _DropdownMenuTrigger,
} from '../../ui/dropdown-menu/dropdown-menu';

// Language and currency options
const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
];

const currencies = [
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
];

export function UserPreferences(): JSX.Element {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [activeTab, setActiveTab] = useState<'appearance' | 'language' | 'currency'>('appearance');

    // User preferences
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [selectedCurrency, setSelectedCurrency] = useState('INR');

    // Only run on client
    useEffect(() => {
        setMounted(true);

        // Load saved preferences from localStorage
        const _savedLanguage = localStorage.getItem('language') || 'en';
        const _savedCurrency = localStorage.getItem('currency') || 'INR';

        setSelectedLanguage(_savedLanguage);
        setSelectedCurrency(_savedCurrency);
    }, []);

    // Save preferences to localStorage
    const _savePreferences = () => {
        localStorage.setItem('language', selectedLanguage);
        localStorage.setItem('currency', selectedCurrency);
        setOpenDialog(false);
    };

    const _resetPreferences = () => {
        setSelectedLanguage('en');
        setSelectedCurrency('INR');
        setTheme('light');
    };

    if (!mounted) {
        return null;
    }

    const getCurrentLanguage = () => {
        return languages.find(_lang => _lang.code === selectedLanguage) || languages[0];
    };

    const getCurrentCurrency = () => {
        return currencies.find(_curr => _curr.code === selectedCurrency) || currencies[0];
    };

    const _tabs = [
        { id: 'appearance', label: 'Appearance', icon: theme === 'dark' ? Moon : Sun },
        { id: 'language', label: 'Language', icon: Globe },
        { id: 'currency', label: 'Currency', icon: DollarSign },
    ];

    return (
        <_Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <_DropdownMenu>
                <_DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-full w-9 h-9 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center justify-center">
                        <Settings className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                        <span className="sr-only">User preferences</span>
                    </Button>
                </_DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>Preferences</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <_DropdownMenuGroup>
                        <DropdownMenuItem onSelect={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                            {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                        </DropdownMenuItem>

                        <_DialogTrigger asChild>
                            <DropdownMenuItem>
                                <Globe className="mr-2 h-4 w-4" />
                                <span>Language:</span>
                                <span className="ml-auto font-medium text-xs flex items-center">
                                    {getCurrentLanguage().flag} {getCurrentLanguage().name}
                                    <ChevronDown className="ml-1 h-3 w-3" />
                                </span>
                            </DropdownMenuItem>
                        </_DialogTrigger>
                        <_DialogTrigger asChild>
                            <DropdownMenuItem>
                                <DollarSign className="mr-2 h-4 w-4" />
                                <span>Currency:</span>
                                <span className="ml-auto font-medium text-xs flex items-center">
                                    {getCurrentCurrency().symbol} {getCurrentCurrency().code}
                                    <ChevronDown className="ml-1 h-3 w-3" />
                                </span>
                            </DropdownMenuItem>
                        </_DialogTrigger>
                    </_DropdownMenuGroup>

                    <DropdownMenuSeparator />
                    <_DialogTrigger asChild>
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>All Preferences</span>
                        </DropdownMenuItem>
                    </_DialogTrigger>
                </DropdownMenuContent>
            </_DropdownMenu>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>User Preferences</DialogTitle>
                    <DialogDescription>
                        Customize your experience with IndiCab
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    {/* Tabs */}
                    <div className="flex border-b mb-4">
                        {_tabs.map((tab): JSX.Element => (
                            <button
                                key={tab.id}
                                className={`px-4 py-2 flex items-center gap-2 text-sm font-medium ${activeTab === tab.id
                                        ? 'text-primary border-b-2 border-primary'
                                        : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                                    }`}
                                onClick={() => setActiveTab(tab.id as any)}
                            >
                                <tab.icon className="h-4 w-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab content */}
                    <div className="mt-2">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {activeTab === 'appearance' && (
                                    <div className="space-y-4">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Choose your preferred theme mode
                                        </p>
                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-2 ${theme === 'light'
                                                        ? 'border-primary bg-primary/5 text-primary'
                                                        : 'border-gray-200 dark:border-gray-700'
                                                    }`}
                                                onClick={() => setTheme('light')}
                                            >
                                                <Sun className="h-6 w-6" />
                                                <span className="text-sm font-medium">Light</span>
                                                {theme === 'light' && (
                                                    <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                                                )}
                                            </button>
                                            <button
                                                className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-2 ${theme === 'dark'
                                                        ? 'border-primary bg-primary/5 text-primary'
                                                        : 'border-gray-200 dark:border-gray-700'
                                                    }`}
                                                onClick={() => setTheme('dark')}
                                            >
                                                <Moon className="h-6 w-6" />
                                                <span className="text-sm font-medium">Dark</span>
                                                {theme === 'dark' && (
                                                    <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {activeTab === 'language' && (
                                    <div className="space-y-4">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Select your preferred language for the website
                                        </p>
                                        <div className="grid gap-2">
                                            {languages.map((language): JSX.Element => (
                                                <button
                                                    key={language.code} // Unique key added here
                                                    className={`p-2 rounded-lg border flex items-center gap-3 ${selectedLanguage === language.code
                                                            ? 'border-primary bg-primary/5 text-primary'
                                                            : 'border-gray-200 dark:border-gray-700'
                                                        }`}
                                                    onClick={() => setSelectedLanguage(language.code)}
                                                >
                                                    <span className="text-xl">{language.flag}</span>
                                                    <span className="text-sm font-medium">{language.name}</span>
                                                    {selectedLanguage === language.code && (
                                                        <Check className="ml-auto h-4 w-4 text-primary" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'currency' && (
                                    <div className="space-y-4">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Select your preferred currency for prices
                                        </p>
                                        <div className="grid gap-2">
                                            {currencies.map((currency): JSX.Element => (
                                                <button
                                                    key={currency.code} // Unique key added here
                                                    className={`p-2 rounded-lg border flex items-center gap-3 ${selectedCurrency === currency.code
                                                            ? 'border-primary bg-primary/5 text-primary'
                                                            : 'border-gray-200 dark:border-gray-700'
                                                        }`}
                                                    onClick={() => setSelectedCurrency(currency.code)}
                                                >
                                                    <span className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-lg">
                                                        {currency.symbol}
                                                    </span>
                                                    <div className="flex flex-col items-start">
                                                        <span className="text-sm font-medium">{currency.code}</span>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">{currency.name}</span>
                                                    </div>
                                                    {selectedCurrency === currency.code && (
                                                        <Check className="ml-auto h-4 w-4 text-primary" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <DialogFooter className="sm:justify-between">
                    <Button
                        variant="outline"
                        onClick={_resetPreferences}
                        className="mr-auto"
                    >
                        Reset to Default
                    </Button>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setOpenDialog(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={_savePreferences}
                            className="bg-primary hover:bg-primary/90 text-white"
                        >
                            Save Preferences
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </_Dialog>
    );
}
