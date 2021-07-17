class Context {
    constructor(getNextTrigger) {
        this.getNextTrigger = getNextTrigger;
    }
    async *[Symbol.asyncIterator]() {
        while (true) {
            yield await this.getNextTrigger();
        }
    }
}
export const createHandler = (currentState, transitions) => {
    const context = new Context(async () => {
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
        return trigger;
    });
    return {
        get: (_, key) => key === Symbol.iterator || key === Symbol.asyncIterator
            ? context[key]
            : currentState[key],
        set: (_, key, value) => currentState[key] = value
    };
};
