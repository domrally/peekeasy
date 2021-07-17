// a context manages the state and transitions of a state machine
export const handleContext = (currentState, transitions) => {
    const update = async () => {
        const state = currentState;
        const asyncIterator = state[Symbol.asyncIterator]();
        const next = await asyncIterator.next();
        const trigger = next.value;
        if (state === currentState) {
            currentState = customize(state, transitions[trigger]);
        }
        return trigger;
    };
    const asyncIterable = {
        async *[Symbol.asyncIterator]() {
            yield* generator(update);
        }
    };
    loop(asyncIterable);
    return {
        get: (_, key) => key === Symbol.iterator || key === Symbol.asyncIterator
            ? asyncIterable[key]
            : currentState[key],
        set: (_, key, value) => currentState[key] = value
    };
};
const loop = async (asyncIterable) => { for await (const _ of asyncIterable) { } };
const generator = async function* (update) {
    while (true) {
        yield await update();
    }
};
const customize = (state, stateMap) => {
    // customize the context with custom actions
    state.onExit?.();
    const nextState = stateMap.get(state);
    nextState.onEnter?.();
    return nextState;
};
