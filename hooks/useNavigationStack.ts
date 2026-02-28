import { useState, useCallback } from 'react';
import { Stack } from '../lib/data-structures/Stack';

export function useNavigationStack<T>() {
    const [stack] = useState(() => new Stack<T>());
    const [currentTop, setCurrentTop] = useState<T | undefined>(undefined);
    const [size, setSize] = useState(0);

    const push = useCallback((item: T) => {
        stack.push(item);
        setCurrentTop(item);
        setSize(stack.size());
    }, [stack]);

    const pop = useCallback(() => {
        const popped = stack.pop();
        setCurrentTop(stack.peek());
        setSize(stack.size());
        return popped;
    }, [stack]);

    const peek = useCallback(() => {
        return stack.peek();
    }, [stack]);

    const clear = useCallback(() => {
        while (!stack.isEmpty()) {
            stack.pop();
        }
        setCurrentTop(undefined);
        setSize(0);
    }, [stack]);

    return {
        push,
        pop,
        peek,
        clear,
        currentTop,
        size,
        isEmpty: size === 0,
    };
}
