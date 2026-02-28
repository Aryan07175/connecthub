export class Graph {
    private adjacencyList: Map<string, string[]>;

    constructor() {
        this.adjacencyList = new Map();
    }

    // Add a user node (vertex) to the graph
    addNode(userId: string) {
        if (!this.adjacencyList.has(userId)) {
            this.adjacencyList.set(userId, []);
        }
    }

    // Create An edge (friendship) between two nodes
    // By default, a social friendship is bi-directional
    addEdge(userId1: string, userId2: string) {
        if (!this.adjacencyList.has(userId1)) {
            this.addNode(userId1);
        }
        if (!this.adjacencyList.has(userId2)) {
            this.addNode(userId2);
        }

        // Don't add if they are already friends
        if (!this.adjacencyList.get(userId1)?.includes(userId2)) {
            this.adjacencyList.get(userId1)?.push(userId2);
        }
        if (!this.adjacencyList.get(userId2)?.includes(userId1)) {
            this.adjacencyList.get(userId2)?.push(userId1);
        }
    }

    // Remove a friendship
    removeEdge(userId1: string, userId2: string) {
        const list1 = this.adjacencyList.get(userId1);
        if (list1) {
            this.adjacencyList.set(userId1, list1.filter((id) => id !== userId2));
        }

        const list2 = this.adjacencyList.get(userId2);
        if (list2) {
            this.adjacencyList.set(userId2, list2.filter((id) => id !== userId1));
        }
    }

    // Remove a user entirely
    removeNode(userId: string) {
        const friends = this.adjacencyList.get(userId);
        if (friends) {
            for (const friend of friends) {
                this.removeEdge(userId, friend);
            }
        }
        this.adjacencyList.delete(userId);
    }

    // Get all friends (edges from a vertex)
    getFriends(userId: string): string[] {
        return this.adjacencyList.get(userId) || [];
    }

    // Breadth-First Search (BFS) to find friends of friends / degrees of separation
    // Useful for "Suggested Friends"
    getConnectionsWithinDegrees(startUserId: string, maxDegree: number = 2): string[] {
        if (!this.adjacencyList.has(startUserId) || maxDegree < 1) return [];

        const visited = new Set<string>();
        const result = new Set<string>();

        // Queue stores [nodeId, currentDegree]
        const queue: [string, number][] = [[startUserId, 0]];
        visited.add(startUserId);

        while (queue.length > 0) {
            const [currentUserId, degree] = queue.shift()!;

            // Add to results if it's not the user themselves
            if (currentUserId !== startUserId) {
                result.add(currentUserId);
            }

            // Stop exploring deeper if we've hit max degree
            if (degree >= maxDegree) {
                continue;
            }

            const friends = this.getFriends(currentUserId);
            for (const friendId of friends) {
                if (!visited.has(friendId)) {
                    visited.add(friendId);
                    queue.push([friendId, degree + 1]);
                }
            }
        }

        return Array.from(result);
    }

    // Singleton pattern for API routes in Dev
    static instance: Graph;
    static getInstance(): Graph {
        if (!Graph.instance) {
            Graph.instance = new Graph();
        }
        return Graph.instance;
    }
}
