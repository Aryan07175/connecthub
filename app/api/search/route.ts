import { NextResponse } from 'next/server';
import { Trie } from '../../../lib/data-structures/Trie';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');

    if (!q) {
        return NextResponse.json({ results: [] });
    }

    // Get the Singleton Trie
    const trie = Trie.getInstance();

    // O(K) where K is length of prefix to find autocomplete suggestions
    const results = trie.findPrefix(q);

    return NextResponse.json({ results });
}

// Helper to seed the Trie for testing
export async function POST(request: Request) {
    const { username, id, name } = await request.json();
    const trie = Trie.getInstance();

    trie.insert(username, { id, username, name });

    return NextResponse.json({ success: true, message: `Added ${username} to Search Trie` });
}
