import { NextResponse } from 'next/server';

// Array for static / O(1) indexed data
const trendingTopics: { tag: string, count: number }[] = [];

export async function GET() {
    // Sort the array by count descending and take top 10
    const top10 = trendingTopics.sort((a, b) => b.count - a.count).slice(0, 10);
    return NextResponse.json({ trending: top10 });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(_request: Request) {

    const { tag } = await _request.json();

    // O(N) search to find if it exists
    const existingIndex = trendingTopics.findIndex(t => t.tag === tag);

    if (existingIndex >= 0) {
        // Modify existing element
        trendingTopics[existingIndex].count += 1;
    } else {
        // Add to Array
        trendingTopics.push({ tag, count: 1 });
    }

    return NextResponse.json({ success: true, message: `Trend recorded for ${tag}` });
}
