import { NextResponse } from 'next/server';

// A completely stubbed auth route returning a fake session for testing purposes
export async function GET() {
    return NextResponse.json({
        user: {
            id: "user_123",
            name: "Test User",
            email: "test@example.com"
        }
    });
}

export async function POST() {
    return NextResponse.json({ success: true });
}
