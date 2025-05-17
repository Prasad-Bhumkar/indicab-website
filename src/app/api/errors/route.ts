import { NextResponse } from 'next/server';
import logger from '../../../lib/logger';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const errorData = await request.json();
    
    logger.error('Client Error Report', {
      message: errorData.message,
      stack: errorData.stack,
      url: errorData.url,
      component: errorData.component,
      userAgent: request.headers.get('user-agent'),
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    logger.error('Error reporting failed', {
      error: error instanceof Error ? error.message : String(error)
    });
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}