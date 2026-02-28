// Node for a Doubly Linked List
export class ListNode<T> {
    data: T;
    next: ListNode<T> | null;
    prev: ListNode<T> | null;

    constructor(data: T) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

// Doubly Linked List optimized for $O(1)$ constant-time insertions at the head
export class LinkedList<T> {
    head: ListNode<T> | null;
    tail: ListNode<T> | null;
    size: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // Insert a new post at the very top (head) of the feed
    // O(1) time complexity - instant update for new posts
    prepend(data: T) {
        const newNode = new ListNode(data);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }

        this.size++;
    }

    // Append a post to the bottom (tail) 
    // O(1) time complexity
    append(data: T) {
        const newNode = new ListNode(data);

        if (!this.tail) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.size++;
    }

    // Convert to Array for serialization / UI rendering
    // O(n) time complexity - needed for network transfer and React mapping
    toArray(): T[] {
        const arr: T[] = [];
        let current = this.head;

        while (current) {
            arr.push(current.data);
            current = current.next;
        }

        return arr;
    }

    // Singleton pattern for API routes in Dev
    static instance: LinkedList<any>;
    static getInstance<T>(): LinkedList<T> {
        if (!LinkedList.instance) {
            LinkedList.instance = new LinkedList<T>();
        }
        return LinkedList.instance;
    }
}
