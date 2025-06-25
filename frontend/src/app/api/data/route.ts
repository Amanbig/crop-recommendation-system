import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const size = searchParams.get('size') || '10';

    // Validate parameters
    const pageNum = parseInt(page);
    const sizeNum = parseInt(size);

    if (isNaN(pageNum) || pageNum < 1) {
      return NextResponse.json(
        { error: 'Invalid page parameter. Must be a positive integer.' },
        { status: 400 }
      );
    }

    if (isNaN(sizeNum) || sizeNum < 1 || sizeNum > 100) {
      return NextResponse.json(
        { error: 'Invalid size parameter. Must be between 1 and 100.' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${BACKEND_URL}/data?page=${pageNum}&size=${sizeNum}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
