// a context manages the state and transitions of a state machine
export const handleContext = (currentState, transitions) => {
    const asyncIterable = {
        async *[Symbol.asyncIterator]() {
            while (true) {
                const state = currentState;
                const asyncIterator = state[Symbol.asyncIterator]();
                const next = await asyncIterator.next();
                const trigger = next.value;
                if (state === currentState) {
                    state.onExit?.();
                    const stateMap = transitions[trigger];
                    const nextState = stateMap.get(state);
                    nextState.onEnter?.();
                    currentState = nextState;
                }
                yield trigger;
            }
        }
    };
    (async () => { for await (const _ of asyncIterable) { } })();
    return {
        get: (_, key) => key === Symbol.iterator || key === Symbol.asyncIterator
            ? asyncIterable[key]
            : currentState[key],
        set: (_, key, value) => currentState[key] = value
    };
};
