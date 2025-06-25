import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json(
      {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        service: 'crop-recommendation-frontend',
        version: '1.0.0',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
        service: 'crop-recommendation-frontend',
      },
      { status: 500 }
    );
  }
}
