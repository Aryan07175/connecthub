import { NextResponse } from 'next/server';
import { Graph } from '../../../lib/data-structures/Graph';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const graph = Graph.getInstance();

    // Directly connected nodes
    const friends = graph.getFriends(userId);

    // Nodes connected by 2 degrees (Friends of Friends) - O(V+E) BFS traversal
    const suggestedFriends = graph.getConnectionsWithinDegrees(userId, 2);

    return NextResponse.json({
        friends,
        suggestedFriends: suggestedFriends.filter(id => !friends.includes(id))
    });
}

export async function POST(request: Request) {
    const { userId1, userId2 } = await request.json();
    const graph = Graph.getInstance();

    // Add undirected edge
    graph.addEdge(userId1, userId2);

    return NextResponse.json({ success: true, message: `Created friendship between ${userId1} and ${userId2}` });
}
