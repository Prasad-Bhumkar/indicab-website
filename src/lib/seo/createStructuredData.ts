/**
 * Generates JSON-LD structured data for SEO enhancement
 * 
 * This module provides functions to create structured data following schema.org specifications
 * for better search engine visibility and rich snippets.
 * 
 * @see https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data
 * @see https://schema.org/docs/schemas.html
 */

/**
 * Creates structured data for an organization
 * @param {Object} [options] - Optional configuration
 * @param {string} [options.url] - Organization website URL
 * @param {string} [options.logo] - URL to organization logo
 * @param {string[]} [options.socialProfiles] - Array of social profile URLs
 * @param {string} [options.phone] - Contact phone number
 * @returns {Object} JSON-LD structured data
 * @throws {Error} If required fields are missing
 */
export function createOrganizationData(options: {
  url?: string;
  logo?: string;
  socialProfiles?: string[];
  phone?: string;
} = {}) {
  const { url = 'https://indicab.example.com', logo = 'https://indicab.example.com/indicab-logo.svg', socialProfiles = [], phone = '+91-9876543210' } = options;

  if (!url || !logo) {
    throw new Error('Organization URL and logo are required');
  }

  if (!phone) {
    throw new Error('Contact phone number is required');
  }
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

/**
 * Creates structured data for a local business (taxi service)
 * @param {Object} [options] - Configuration options
 * @param {string} options.name - Business name
 * @param {string} options.image - Business logo/image URL
 * @param {string} options.url - Business website URL
 * @param {string} options.phone - Contact phone number
 * @param {Object} options.address - Physical address
 * @param {Object} options.geo - Geo coordinates
 * @returns {Object} JSON-LD structured data
 * @throws {Error} If required fields are missing
 */
export function createLocalBusinessData(options: {
  name: string;
  image: string;
  url: string;
  phone: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
}) {
  const { name, image, url, phone, address, geo } = options;

  if (!name || !image || !url || !phone) {
    throw new Error('Name, image, URL and phone are required');
  }

  if (!address || !address.streetAddress || !address.addressLocality || !address.postalCode || !address.addressCountry) {
    throw new Error('Complete address information is required');
  }

  if (!geo || !geo.latitude || !geo.longitude) {
    throw new Error('Geo coordinates are required');
  }
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

/**
 * Creates structured data for FAQ content
 * @param {Array<{question: string, answer: string}>} faqs - Array of FAQ items
 * @returns {Object} JSON-LD structured data
 * @throws {Error} If FAQ array is empty or items are invalid
 */
export function createFaqData(faqs: Array<{question: string, answer: string}>) {
  if (!faqs || !faqs.length) {
    throw new Error('At least one FAQ item is required');
  }

  for (const faq of faqs) {
    if (!faq.question || !faq.answer) {
      throw new Error('Each FAQ item must have both question and answer');
    }
  }
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

/**
 * Creates structured data for a service (taxi service)
 * @param {Object} service - Service configuration
 * @param {string} service.name - Service name
 * @param {string} service.description - Service description
 * @param {string} [service.provider] - Service provider name
 * @param {string[]} [service.areaServed] - Areas served by the service
 * @param {string} [service.price] - Service price
 * @param {string} [service.image] - Service image URL
 * @returns {Object} JSON-LD structured data
 * @throws {Error} If required fields are missing
 */
export function createServiceData(service: {
  name: string;
  description: string;
  provider?: string;
  areaServed?: string[];
  price?: string;
  image?: string;
}) {
  if (!service.name || !service.description) {
    throw new Error('Service name and description are required');
  }
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

/**
 * Creates structured data for an article/blog post
 * @param {Object} article - Article details
 * @param {string} article.headline - Article headline
 * @param {string} article.description - Article description
 * @param {string} article.image - Article image URL
 * @param {string} article.datePublished - Publication date (ISO format)
 * @param {string} [article.dateModified] - Last modified date (ISO format)
 * @param {string} article.author - Author name
 * @returns {Object} JSON-LD structured data
 * @throws {Error} If required fields are missing or invalid
 */
export function createArticleData(article: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
}) {
  if (!article.headline || !article.description || !article.image) {
    throw new Error('Article headline, description and image are required');
  }
  if (!article.datePublished || isNaN(Date.parse(article.datePublished))) {
    throw new Error('Valid publication date is required');
  }
  if (!article.author) {
    throw new Error('Author name is required');
  }
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

/**
 * Creates structured data for breadcrumb navigation
 * @param {Array<{name: string, url: string}>} breadcrumbs - Array of breadcrumb items
 * @returns {Object} JSON-LD structured data
 * @throws {Error} If breadcrumbs array is empty or items are invalid
 */
export function createBreadcrumbData(breadcrumbs: Array<{name: string, url: string}>) {
  if (!breadcrumbs || !breadcrumbs.length) {
    throw new Error('At least one breadcrumb item is required');
  }
  for (const crumb of breadcrumbs) {
    if (!crumb.name || !crumb.url) {
      throw new Error('Each breadcrumb must have both name and URL');
    }
  }
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

export function createOrganizationStructuredData(data: any): any {
  throw new Error('Function not implemented.');
}

export function createOrganizationStructuredData(data: any): any {
  throw new Error('Function not implemented.');
}
