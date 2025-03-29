import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Car } from 'lucide-react';
import type { Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#0c9242',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
      <div className="text-center">
        <div className="mb-4">
          <Car className="h-16 w-16 text-primary mx-auto" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">Sorry, we couldn't find the page you're looking for.</p>
        <Link href="/" passHref>
          <Button className="bg-primary hover:bg-primary/90 text-white">
            Go back home
          </Button>
        </Link>
      </div>
    </div>
  );
}