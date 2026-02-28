# ConnectHub: A Mini Social Network Engine

Welcome to **ConnectHub**. While it looks like a social network, it’s actually a playground for high-performance data structures. 

Most modern apps rely on heavy databases to do the heavy lifting. ConnectHub takes a different approach: it’s built from the ground up using **in-memory, custom-built TypeScript data structures**. By moving logic into optimized Singletons, we achieve lightning-fast operations that standard arrays or databases often struggle with.

---

## 🧠 The Algorithmic Backbone

This project isn't just about UI; it's a showcase of five core data structures built from scratch to handle specific social networking challenges.

### 1. The Social Graph (`lib/data-structures/Graph.ts`)
**Purpose:** Managing relationships.
Instead of expensive SQL joins, we use an **Adjacency List** to map friendships. 
* **The Logic:** Powers the `/api/friends` endpoint.
* **The Magic:** Uses **Breadth-First Search (BFS)** to find "Friends of Friends" (2nd-degree connections) in a fraction of the time a traditional query would take.

### 2. Prefix Tree / Trie (`lib/data-structures/Trie.ts`)
**Purpose:** Instant Search & Autocomplete.
Traditional search filters usually have a complexity of O(N x L). Our Trie brings that down to **O(M)**, where M is simply the length of the word you're typing.
* **The Logic:** Powers the `/api/search` endpoint.
* **The Magic:** As you type, the search predicts your intent instantly by traversing character nodes.

### 3. Doubly Linked List (`lib/data-structures/LinkedList.ts`)
**Purpose:** The Infinite Feed.
Standard arrays suffer from a "re-indexing penalty" when you add items to the front. 
* **The Logic:** Wrapped by the `useInfiniteFeed` hook on the `/feed` page.
* **The Magic:** New posts are injected at the `head` in **O(1) constant time**. Whether you have 10 posts or 10,000, the speed remains identical.

### 4. Stack (`lib/data-structures/Stack.ts`)
**Purpose:** Internal Navigation History.
We wanted a "Back" button that didn't rely on the browser's messy history.
* **The Logic:** Managed by the `useNavigationStack` hook on profile pages.
* **The Magic:** Uses **Last-In-First-Out (LIFO)** logic to track exactly which profiles you've visited in a strict, predictable sequence.

### 5. Queue (`lib/data-structures/Queue.ts`)
**Purpose:** Background Notifications.
Not everything needs to happen at once. 
* **The Logic:** Operates the `/api/notifications` endpoint.
* **The Magic:** Follows **First-In-First-Out (FIFO)** logic to simulate a background processing buffer, ensuring app events are handled in the exact order they occurred without locking the main UI.

---

## 🚀 Getting Started

To see these structures in action, fire up the development environment:

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Start the engine:**
    ```bash
    npm run dev
    ```
3.  **Explore:**
    Head over to [http://localhost:3000](http://localhost:3000).

---

## 🗺 App Roadmap

* **`/feed`**: Test the Linked List by spamming new posts.
* **`/search`**: Experience the O(M) speed of the Trie.
* **`/profile/[id]`**: Navigate through users to see the Stack in action.
* **`/notifications`**: Watch the FIFO Queue process events.
* **`/trending`**: A baseline comparison using standard Array sorting.
