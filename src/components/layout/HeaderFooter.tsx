'use client';

import dynamic from 'next/dynamic';

const Header = dynamic(() => import('./header/Header'), {
  loading: () => <div className="h-16 bg-gray-100" />,
  ssr: false,
});

const Footer = dynamic(() => import('./footer/Footer'), {
  loading: () => <div className="h-12 bg-gray-100" />,
  ssr: false,
});

export default function HeaderFooter() {
  return (
    <>
      <Header />
      <Footer />
    </>
  );
}