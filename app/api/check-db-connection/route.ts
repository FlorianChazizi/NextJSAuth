import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb'; // Import the DB connection

export async function GET() {
  try {
    await connectToDatabase();  // Try to connect to the database
    return NextResponse.json({ success: true, message: 'Connected to database' });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ success: false, message: 'Failed to connect to database' }, { status: 500 });
  }
}   