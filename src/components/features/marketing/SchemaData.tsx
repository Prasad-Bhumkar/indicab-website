"use client";

import { useEffect, useState } from 'react';

export type SchemaDataType =
    | {
        type: 'organization';
        data: {
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
        };
    }
    | {
        type: 'localBusiness';
        data: {
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
        };
    }
    | { type: 'faq'; data: Array<{ question: string, answer: string }> }
    | {
        type: 'service'; data: {
            name: string;
            description: string;
            provider?: string;
            areaServed?: string[];
            price?: string;
            image?: string;
        }
    }
    | {
        type: 'article'; data: {
            headline: string;
            description: string;
            image: string;
            datePublished: string;
            dateModified?: string;
            author: string;
        }
    }
    | { type: 'breadcrumb'; data: Array<{ name: string, url: string }> }
    | { type: 'custom'; data: Record<string, unknown> };

type SchemaDataProps = {
    schema: SchemaDataType | SchemaDataType[];
};

export default function SchemaData({ schema }: SchemaDataProps): JSX.Element {
    const [mounted, setMounted] = useState(false);
    const [schemaData, setSchemaData] = useState<Record<string, unknown>[]>([]);

    // Dynamic import structured data utilities and generate schema
    useEffect(() => {
        // Only run on client
        setMounted(true);

        // Don't attempt to dynamically import in SSR
        if (typeof window === 'undefined') return;

        const _loadSchemaData = async () => {
            try {
                // Dynamic import to ensure this only runs on the client
                const schemaModule = await import('@/lib/seo/createStructuredData');
                const _schemas = Array.isArray(schema) ? schema : [schema];

                const _generatedSchemas = _schemas.map(item => {
                    switch (item.type) {
                        case 'organization':
                            return schemaModule.createOrganizationStructuredData({
                                name: item.data.name,
                                image: item.data.image,
                                url: item.data.url,
                                phone: item.data.phone,
                                address: {
                                    streetAddress: item.data.address.streetAddress,
                                    addressLocality: item.data.address.addressLocality,
                                    postalCode: item.data.address.postalCode,
                                    addressCountry: item.data.address.addressCountry
                                },
                                geo: {
                                    latitude: item.data.geo.latitude,
                                    longitude: item.data.geo.longitude
                                }
                            });
                        case 'localBusiness':
                            return schemaModule.createLocalBusinessData({
                                name: item.data.name,
                                image: item.data.image,
                                url: item.data.url,
                                phone: item.data.phone,
                                address: {
                                    streetAddress: item.data.address.streetAddress,
                                    addressLocality: item.data.address.addressLocality,
                                    postalCode: item.data.address.postalCode,
                                    addressCountry: item.data.address.addressCountry
                                },
                                geo: {
                                    latitude: item.data.geo.latitude,
                                    longitude: item.data.geo.longitude
                                }
                            });
                        case 'faq':
                            return schemaModule.createFaqData(item.data);
                        case 'service':
                            return schemaModule.createServiceData(item.data);
                        case 'article':
                            return schemaModule.createArticleData(item.data);
                        case 'breadcrumb':
                            return schemaModule.createBreadcrumbData(item.data);
                        case 'custom':
                            return item.data;
                        default:
                            return {};
                    }
                });

                setSchemaData(_generatedSchemas);
            } catch (error) {
                console.error('Error loading schema data:', error);
                setSchemaData([]);
            }
        };

        _loadSchemaData();
    }, [schema]); // Only depends on schema prop

    // Only render the script tags on the client to avoid hydration mismatch
    if (!mounted) return null;

    return (
        <>
            {schemaData.map((data, _index): JSX.Element => (
                <script
                    key={_index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
                />
            ))}
        </>
    );
}
