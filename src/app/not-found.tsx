'use client';

// import { Button } from '@components/ui/Button';
import { Car } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

export default function NotFound(): JSX.Element {
    const { t } = useTranslation('common');

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
            <div className="text-center">
                <div className="mb-4">
                    <Car className="h-16 w-16 text-primary mx-auto" />
                </div>
                <h1 className="text-6xl font-bold text-primary">404</h1>
                <h2 className="mt-4 text-2xl font-semibold text-gray-900">
                    {t('common.error.notFound', 'Page not found')}
                </h2>
                <p className="mt-2 text-gray-600">
                    {t('common.error.general', 'Something went wrong')}
                </p>
                <div className="mt-8">
                    <Link
                        href="/"
                        className="rounded-md bg-primary px-6 py-3 text-white hover:bg-primary-dark transition-colors"
                    >
                        {t('common.backToHome', 'Back to Home')}
                    </Link>
                </div>
            </div>
        </main>
    );
}
