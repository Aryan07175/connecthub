// Last-In-First-Out (LIFO)
export class Stack<T> {
    private items: T[];

    constructor() {
        this.items = [];
    }

    // Push an item onto the top of the stack
    push(item: T) {
        this.items.push(item);
    }

    // Pop an item off the top of the stack and return it
    pop(): T | undefined {
        return this.items.pop();
    }

    // See what's on top without removing it
    peek(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.items.length - 1];
    }

    // Check if stack is empty
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    // Get current size of stack
    size(): number {
        return this.items.length;
    }
}
