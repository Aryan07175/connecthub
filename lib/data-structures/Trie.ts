export class TrieNode {
    children: Map<string, TrieNode>;
    isEndOfWord: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userData: any; // We'll store basic user info here for instant suggestions

    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
        this.userData = null;
    }
}

export class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    // Insert a user's name/handle into the Trie for autocomplete Search
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    insert(word: string, userData: any) {
        const wordLower = word.toLowerCase();
        let current = this.root;

        for (let i = 0; i < wordLower.length; i++) {
            const char = wordLower[i];
            if (!current.children.has(char)) {
                current.children.set(char, new TrieNode());
            }
            current = current.children.get(char)!;
        }

        current.isEndOfWord = true;
        current.userData = userData; // Store user details at the end of their name path
    }

    // Find all words starting with a given prefix
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    findPrefix(prefix: string): any[] {
        const prefixLower = prefix.toLowerCase();
        let current = this.root;

        for (let i = 0; i < prefixLower.length; i++) {
            const char = prefixLower[i];
            if (!current.children.has(char)) {
                return []; // No matches found for this prefix
            }
            current = current.children.get(char)!;
        }

        // Found the prefix path, now gather all complete words under it
        return this.collectAllWords(current, prefixLower);
    }

    // Helper method to traverse down gathering results
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private collectAllWords(node: TrieNode, currentWord: string): any[] {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let results: any[] = [];

        if (node.isEndOfWord) {
            // Return the stored user data (e.g. { id, username, name })
            results.push(node.userData);
        }

        for (const [char, childNode] of node.children.entries()) {
            results = results.concat(this.collectAllWords(childNode, currentWord + char));
        }

        return results;
    }

    // Singleton pattern for API routes in Dev
    static instance: Trie;
    static getInstance(): Trie {
        if (!Trie.instance) {
            Trie.instance = new Trie();
        }
        return Trie.instance;
    }
}
