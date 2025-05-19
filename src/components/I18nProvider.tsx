'use client';

import { Suspense } from 'react';

import { I18nextProvider } from 'react-i18next';

import i18n from '@/utils/i18n/config';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading translations...</div>}>
      <I18nextProvider i18n={i18n}>
        {children}
      </I18nextProvider>
    </Suspense>
  );
} 