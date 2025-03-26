/**
 * Generates JSON-LD structured data for SEO enhancement
 *
 * @see https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data
 */

// Organization structured data
export function createOrganizationData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'IndiCab',
    url: 'https://indicab.example.com', // Replace with your actual domain
    logo: 'https://indicab.example.com/indicab-logo.svg', // Replace with your actual logo URL
    sameAs: [
      'https://www.facebook.com/indicab',
      'https://www.instagram.com/indicab',
      'https://twitter.com/indicab'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9876543210',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi']
    }
  };
}

// Local business structured data (for cab service)
export function createLocalBusinessData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    name: 'IndiCab',
    image: 'https://indicab.example.com/indicab-logo.svg',
    '@id': 'https://indicab.example.com',
    url: 'https://indicab.example.com',
    telephone: '+91-9876543210',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Cab Street',
      addressLocality: 'New Delhi',
      postalCode: '110001',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.6139,
      longitude: 77.2090
    },
    priceRange: '₹₹',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday', 'Sunday'
      ],
      opens: '00:00',
      closes: '23:59'
    }
  };
}

// FAQ structured data
export function createFaqData(faqs: Array<{question: string, answer: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

// Service structured data (for cab service types)
export function createServiceData(service: {
  name: string;
  description: string;
  provider?: string;
  areaServed?: string[];
  price?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'TaxiService',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: service.provider || 'IndiCab'
    },
    areaServed: service.areaServed?.map(area => ({
      '@type': 'City',
      name: area
    })) || [],
    offers: {
      '@type': 'Offer',
      price: service.price || '',
      priceCurrency: 'INR'
    },
    image: service.image || 'https://indicab.example.com/indicab-logo.svg'
  };
}

// Article structured data (for blog posts)
export function createArticleData(article: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'IndiCab',
      logo: {
        '@type': 'ImageObject',
        url: 'https://indicab.example.com/indicab-logo.svg'
      }
    }
  };
}

// Breadcrumb structured data
export function createBreadcrumbData(breadcrumbs: Array<{name: string, url: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url
    }))
  };
}
