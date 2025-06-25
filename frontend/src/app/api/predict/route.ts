import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

interface PredictionRequest {
  N: number;
  P: number;
  K: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall'];
    const missingFields = requiredFields.filter(field => !(field in body));

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate that all fields are numbers
    for (const field of requiredFields) {
      if (typeof body[field] !== 'number' || isNaN(body[field])) {
        return NextResponse.json(
          { error: `Field ${field} must be a valid number` },
          { status: 400 }
        );
      }
    }

    const predictionData: PredictionRequest = {
      N: body.N,
      P: body.P,
      K: body.K,
      temperature: body.temperature,
      humidity: body.humidity,
      ph: body.ph,
      rainfall: body.rainfall,
    };

    const response = await fetch(`${BACKEND_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(predictionData),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error making prediction:', error);

    return NextResponse.json(
      {
        error: 'Failed to make prediction',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
