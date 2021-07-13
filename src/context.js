export const createContext = (currentState, transitions) => {
    // 
    const asyncIterable = {
        async *[Symbol.asyncIterator]() {
            while (true) {
                const state = currentState;
                const next = await currentState[Symbol.asyncIterator]().next();
                const trigger = next.value;
                if (state === currentState) {
                    const nextState = transitions[trigger].get(state);
                    currentState.onExit?.();
                    nextState.onEnter?.();
                    currentState = nextState;
                }
                yield trigger;
            }
        }
    };
    (async () => { for await (const _ of asyncIterable) { } })();
    //
    return {
        get: (_, key) => key === Symbol.iterator || key === Symbol.asyncIterator
            ? asyncIterable[key]
            : currentState[key],
        set: (_, key, value) => currentState[key] = value
    };
};
