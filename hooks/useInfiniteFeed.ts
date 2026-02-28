import { useState, useCallback, useEffect } from 'react';
import { LinkedList } from '../lib/data-structures/LinkedList';

export function useInfiniteFeed<T>() {
    const [feed] = useState(() => new LinkedList<T>());
    const [items, setItems] = useState<T[]>([]);

    const prepend = useCallback((item: T) => {
        feed.prepend(item);
        setItems(feed.toArray());
    }, [feed]);

    const append = useCallback((item: T) => {
        feed.append(item);
        setItems(feed.toArray());
    }, [feed]);

    const loadInitial = useCallback((initialItems: T[]) => {
        feed.head = null;
        feed.tail = null;
        feed.size = 0;

        initialItems.forEach(item => feed.append(item));
        setItems(feed.toArray());
    }, [feed]);

    return {
        items,
        prepend,
        append,
        loadInitial,
        size: feed.size
    };
}
