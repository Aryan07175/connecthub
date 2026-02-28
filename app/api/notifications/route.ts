import { NextResponse } from 'next/server';
import { Queue, Notification } from '../../../lib/data-structures/Queue';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const queue = Queue.getInstance();

    // Custom method to view queue for a specific user
    const userNotifications = queue.getAllForUser(userId);

    return NextResponse.json({ notifications: userNotifications });
}

// Simulates an event happening (e.g. someone liked your post)
export async function POST(request: Request) {
    const { userId, message } = await request.json();
    const queue = Queue.getInstance();

    // O(1) Push to back of line
    queue.enqueue(new Notification(userId, message));

    return NextResponse.json({ success: true, message: `Notification queued for ${userId}` });
}
