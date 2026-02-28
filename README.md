# ConnectHub - Mini Social Network Engine

ConnectHub is a demonstration project built with **Next.js** to explicitly showcase the algorithmic benefits of five key data structures built from scratch in TypeScript. 

By avoiding complex external databases during development, this project runs all data logic through in-memory isolated global Singletons.

## The 5 Core Data Structures

This application was architected around building and integrating these data structures natively:

1. **Graph** (`lib/data-structures/Graph.ts`)
   - Uses an **Adjacency List** to track unidirectional and bidirectional friendships.
   - Powers the `/api/friends` endpoint.
   - Calculates 2nd-degree friend connections using **Breadth-First Search (BFS)**.

2. **Prefix Tree / Trie** (`lib/data-structures/Trie.ts`)
   - Optimized for instant character-by-character autocomplete Search.
   - Powers the `/api/search` endpoint.
   - Returns instant $O(M)$ path matching where $M$ is the length of the searched prefix.

3. **Queue** (`lib/data-structures/Queue.ts`)
   - A classic **First-In-First-Out (FIFO)** queue.
   - Operates the `/api/notifications` endpoint, simulating delayed background processing of app events.

4. **Stack** (`lib/data-structures/Stack.ts`)
   - A classic **Last-In-First-Out (LIFO)** stack.
   - Wrapped by a custom React Hook (`useNavigationStack`) on the `/profile/[id]` page to maintain a strict local "Back" history decoupled from the browser.

5. **Doubly Linked List** (`lib/data-structures/LinkedList.ts`)
   - A dynamic chain to model moving chronological data.
   - Wrapped by a custom React Hook (`useInfiniteFeed`) on the `/feed` page.
   - Post insertions execute in constant time $O(1)$ by injecting directly at the `head`, avoiding the heavy array re-indexing penalty.

---

## 🚀 Getting Started

First, install the necessary dependencies:

```bash
npm install
```

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the ConnectHub UI.

### 🗺 App Layout

- `/login` & `/register` - Mock authentication screens.
- `/feed` - Test the Doubly Linked List performance by posting.
- `/search` - Experience instant Trie string searching.
- `/notifications` - View the FIFO Queue.
- `/trending` - Demonstrates standard Array sorting.
- `/profile/[id]` - Explore Stack-driven component history navigation!
