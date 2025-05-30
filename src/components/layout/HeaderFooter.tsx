
'use client';

import dynamic from 'next/dynamic';

const _Header = dynamic(() => import('./header/Header.tsx'), {
    loading: () => <div className="h-16 bg-gray-100" />,
    ssr: false,
});

const _Footer = dynamic(() => import('./footer/Footer.tsx'), {
    loading: () => <div className="h-12 bg-gray-100" />,
    ssr: false,
});

export default function HeaderFooter(): JSX.Element {
    return (
        <>
            <_Header />
            <_Footer />
        </>
    );
}
