import { NextResponse } from 'next/server';
import { LinkedList } from '../../../lib/data-structures/LinkedList';

export async function GET() {
    const feed = LinkedList.getInstance<{ id: string, authorId: string, content: string }>();

    // O(N) Array conversion for JSON serialization 
    // (In actual DB, this is a paginated SELECT query)
    const posts = feed.toArray();

    return NextResponse.json({ posts });
}

export async function POST(request: Request) {
    const { authorId, content } = await request.json();
    const feed = LinkedList.getInstance<{ id: string, authorId: string, content: string }>();

    const newPost = {
        id: Math.random().toString(36).substring(2, 9),
        authorId,
        content
    };

    // O(1) Prepend to the head of the Doubly Linked List!
    feed.prepend(newPost);

    return NextResponse.json({ success: true, post: newPost });
}
