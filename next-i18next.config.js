module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'en-IN'],
  },
  defaultNS: 'common',
  debug: process.env.NODE_ENV === 'development',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  localePath: './public/locales',
  use: [
    {
      init: (i18next) => {
        i18next.on('loaded', () => {
          console.log('i18next loaded successfully');
        });
      },
    },
  ],
  fallbackLng: 'en',
  fallbackNS: 'common',
  load: 'all',
  preload: ['en', 'en-IN'],
  saveMissing: true,
  saveMissingTo: 'fallback',
  missingKeyHandler: (lng, ns, key, fallbackValue) => {
    console.warn(`Missing translation key: ${key} for language: ${lng}`);
    return fallbackValue;
  },
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },
}; 