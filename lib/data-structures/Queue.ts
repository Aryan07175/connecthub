export class Notification {
    id: string;
    userId: string;
    message: string;
    read: boolean;
    createdAt: Date;

    constructor(userId: string, message: string) {
        this.id = Math.random().toString(36).substring(2, 9);
        this.userId = userId;
        this.message = message;
        this.read = false;
        this.createdAt = new Date();
    }
}

// First In, First Out (FIFO)
export class Queue {
    private items: Notification[];

    constructor() {
        this.items = [];
    }

    // Add notification to back of the queue
    enqueue(notification: Notification) {
        this.items.push(notification);
    }

    // Remove and return notification from front of the queue
    dequeue(): Notification | undefined {
        return this.items.shift();
    }

    // See front of queue without removing
    peek(): Notification | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[0];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }

    // Convenience method: Get all for a specific user but don't dequeue yet
    getAllForUser(userId: string): Notification[] {
        return this.items.filter(n => n.userId === userId).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    // Singleton pattern for API routes in Dev
    static instance: Queue;
    static getInstance(): Queue {
        if (!Queue.instance) {
            Queue.instance = new Queue();
        }
        return Queue.instance;
    }
}
