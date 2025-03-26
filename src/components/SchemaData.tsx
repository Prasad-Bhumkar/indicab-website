"use client";

import { useEffect, useState } from 'react';

export type SchemaDataType =
  | { type: 'organization' }
  | { type: 'localBusiness' }
  | { type: 'faq'; data: Array<{question: string, answer: string}> }
  | { type: 'service'; data: {
      name: string;
      description: string;
      provider?: string;
      areaServed?: string[];
      price?: string;
      image?: string;
    }}
  | { type: 'article'; data: {
      headline: string;
      description: string;
      image: string;
      datePublished: string;
      dateModified?: string;
      author: string;
    }}
  | { type: 'breadcrumb'; data: Array<{name: string, url: string}> }
  | { type: 'custom'; data: Record<string, unknown> };

type SchemaDataProps = {
  schema: SchemaDataType | SchemaDataType[];
};

export default function SchemaData({ schema }: SchemaDataProps) {
  const [mounted, setMounted] = useState(false);
  const [schemaData, setSchemaData] = useState<Record<string, unknown>[]>([]);

  // Dynamic import structured data utilities and generate schema
  useEffect(() => {
    // Only run on client
    setMounted(true);

    // Don't attempt to dynamically import in SSR
    if (typeof window === 'undefined') return;

    const loadSchemaData = async () => {
      try {
        // Dynamic import to ensure this only runs on the client
        const module = await import('@/lib/seo/createStructuredData');
        const schemas = Array.isArray(schema) ? schema : [schema];

        const generatedSchemas = schemas.map(item => {
          switch (item.type) {
            case 'organization':
              return module.createOrganizationData();
            case 'localBusiness':
              return module.createLocalBusinessData();
            case 'faq':
              return module.createFaqData(item.data);
            case 'service':
              return module.createServiceData(item.data);
            case 'article':
              return module.createArticleData(item.data);
            case 'breadcrumb':
              return module.createBreadcrumbData(item.data);
            case 'custom':
              return item.data;
            default:
              return {};
          }
        });

        setSchemaData(generatedSchemas);
      } catch (error) {
        console.error('Error loading schema data:', error);
        setSchemaData([]);
      }
    };

    loadSchemaData();
  }, [schema]); // Only depends on schema prop

  // Only render the script tags on the client to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <>
      {schemaData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
