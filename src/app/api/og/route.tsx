import React from "react";
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import _logger from '../../../lib/logger';

export const runtime = 'edge';

export async function GET(_request: NextRequest): JSX.Element {
    try {
        const { searchParams } = new URL(_request.url);

        // Get dynamic params from the request
        const _title = searchParams.get('title') || 'IndiCab - Outstation Cab Service';
        const _description = searchParams.get('description') || 'Book cabs for one-way and round trips across India';
        const fromCity = searchParams.get('from');
        const toCity = searchParams.get('to');
        const routeTitle = fromCity && toCity ? `${fromCity} to ${toCity}` : undefined;

        // Return a dynamic OG image with route information or a generic image
        return new ImageResponse(
            (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#FF6B00',
                        position: 'relative',
                        overflow: 'hidden',
                        color: 'white',
                        padding: '40px 80px',
                    }}
                >
                    {/* Background pattern */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            opacity: 0.1,
                            zIndex: 1,
                            backgroundImage: 'radial-gradient(circle at 10px 10px, white 2px, transparent 0)',
                            backgroundSize: '20px 20px',
                        }}
                    />

                    {/* Content container */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            height: '100%',
                            zIndex: 10,
                            padding: '20px',
                            position: 'relative',
                            justifyContent: 'center',
                        }}
                    >
                        {/* Logo and text container */}
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
                            {/* Simplified logo */}
                            <div style={{
                                width: 60,
                                height: 60,
                                backgroundColor: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10,
                                marginRight: 20,
                                color: '#FF6B00',
                                fontSize: 30,
                                fontWeight: 'bold'
                            }}>
                                IC
                            </div>
                            <div style={{ fontSize: 48, fontWeight: 'bold' }}>IndiCab</div>
                        </div>

                        {/* Route-specific content or generic content */}
                        {routeTitle ? (
                            <>
                                <div style={{ fontSize: 64, fontWeight: 'bold', marginBottom: 20 }}>
                                    {routeTitle}
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: 32,
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    padding: '12px 24px',
                                    borderRadius: 12,
                                }}>
                                    <div style={{ marginRight: 12 }}>🚕</div>
                                    <div>Book your cab now</div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div style={{ fontSize: 64, fontWeight: 'bold', marginBottom: 20 }}>
                                    {_title}
                                </div>
                                <div style={{ fontSize: 32 }}>
                                    {_description}
                                </div>
                            </>
                        )}

                        {/* Footer */}
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 40,
                                left: 20,
                                right: 20,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontSize: 24,
                                opacity: 0.8,
                            }}
                        >
                            <div>indicab.example.com</div>
                            <div>Safe • Reliable • Affordable</div>
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        );
    } catch (_e) {
        _logger.error(`Error generating OG image: ${_e}`);
        return new Response(`Failed to generate image`, {
            status: 500,
        });
    }
}
