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
export function createOrganizationData(options: OrganizationStructuredDataOptions): OrganizationStructuredData {
  const { 
    name = 'IndiCab', 
    url = 'https://indicab.example.com', 
    logo = 'https://indicab.example.com/indicab-logo.svg',
    sameAs = [
      'https://www.facebook.com/indicab',
      'https://www.instagram.com/indicab',
      'https://twitter.com/indicab'
    ],
    contactPoint = {
      telephone: '+91-9876543210',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi']
    }
  } = options;

  // Validate required fields
  if (!url) {
    throw new Error('Organization URL is required');
  }
  if (!logo) {
    throw new Error('Organization logo is required');
  }
  if (!contactPoint.telephone) {
    throw new Error('Contact phone number is required');
  }
  
  // Ensure availableLanguage is always a defined array
  const availableLanguage = contactPoint.availableLanguage || ['English'];

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: name || 'IndiCab', // Ensure name is always a string
    url: url, // Already validated above
    logo: logo, // Already validated above
    sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: contactPoint.telephone,
      contactType: contactPoint.contactType || 'customer service',
      availableLanguage
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
export interface LocalBusinessAddress {
  streetAddress: string;
  addressLocality: string;
  postalCode: string;
  addressCountry: string;
}
export interface LocalBusinessGeo {
  latitude: number;
  longitude: number;
}
export interface LocalBusinessDataInput {
  name: string;
  image: string;
  url: string;
  phone: string;
  address: LocalBusinessAddress;
  geo: LocalBusinessGeo;
}
export interface LocalBusinessStructuredData {
  '@context': 'https://schema.org';
  '@type': 'TaxiService';
  name: string;
  image: string;
  '@id': string;
  url: string;
  telephone: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  priceRange: string;
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification';
    dayOfWeek: string[];
    opens: string;
    closes: string;
  };
}
export function createLocalBusinessData(options: LocalBusinessDataInput): LocalBusinessStructuredData {
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
    name,
    image,
    '@id': url,
    url,
    telephone: phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude
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
export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqStructuredData {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export function createFaqData(faqs: FaqItem[]): FaqStructuredData {
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
export interface ServiceDataInput {
  name: string;
  description: string;
  provider?: string;
  areaServed?: string[];
  price?: string;
  image?: string;
}
export interface ServiceStructuredData {
  '@context': 'https://schema.org';
  '@type': 'Service';
  serviceType: string;
  name: string;
  description: string;
  provider: {
    '@type': 'Organization';
    name: string;
  };
  areaServed: Array<{
    '@type': 'City';
    name: string;
  }>;
  offers: {
    '@type': 'Offer';
    price: string;
    priceCurrency: string;
  };
  image: string;
}
export function createServiceData(service: ServiceDataInput): ServiceStructuredData {
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
    areaServed: service.areaServed?.map(_area => ({
      '@type': 'City',
      name: _area
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
export interface ArticleDataInput {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
}
export interface ArticleStructuredData {
  '@context': 'https://schema.org';
  '@type': 'Article';
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: {
    '@type': 'Person';
    name: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    logo: {
      '@type': 'ImageObject';
      url: string;
    };
  };
}
export function createArticleData(article: ArticleDataInput): ArticleStructuredData {
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
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface BreadcrumbStructuredData {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

export function createBreadcrumbData(breadcrumbs: BreadcrumbItem[]): BreadcrumbStructuredData {
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
    itemListElement: breadcrumbs.map((breadcrumb, _index) => ({
      '@type': 'ListItem',
      position: _index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url
    }))
  };
}

export interface OrganizationStructuredDataOptions {
  name?: string;
  url?: string;
  logo?: string;
  sameAs?: string[];
  contactPoint?: {
    telephone: string;
    contactType: string;
    availableLanguage: string[];
  };
}

export interface OrganizationStructuredData {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  sameAs?: string[];
  contactPoint: {
    '@type': 'ContactPoint';
    telephone: string;
    contactType: string;
    availableLanguage: string[];
  };
}

export function createOrganizationStructuredData(
  options: OrganizationStructuredDataOptions
): OrganizationStructuredData {
  const { 
    name = 'IndiCab', 
    url = 'https://indicab.example.com', 
    logo = 'https://indicab.example.com/indicab-logo.svg', 
    sameAs, 
    contactPoint = {
      telephone: '+91-9876543210',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi']
    } 
  } = options;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    ...(sameAs ? { sameAs } : {}),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: contactPoint.telephone,
      contactType: contactPoint.contactType || 'customer service',
      availableLanguage: contactPoint.availableLanguage || ['English']
    }
  };
}
