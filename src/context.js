// a context manages the state and transitions of a state machine
export class Context {
    // 
    constructor(currentState, transitions) {
        this.currentState = currentState;
        this.transitions = transitions;
        this.init();
    }
    // 
    async *[Symbol.asyncIterator]() {
        for await (const next of this.getNext()) {
            const value = next.value;
            while (this.currentState != this.transitions.get(value[1])?.get(value[0])) {
                await new Promise(r => requestAnimationFrame(() => r()));
            }
            yield this.currentState;
        }
    }
    // 
    async *getNext() {
        while (true) {
            yield await this.currentState[Symbol.asyncIterator]().next();
        }
    }
    // 
    get target() {
        const target = Object.assign({}, this.currentState, this);
        return target;
    }
    //
    get handler() {
        return {
            get: (_, property) => this.currentState[property],
            set: (_, property, value) => this.currentState[property] = value
        };
    }
    // 
    async init() {
        for await (const next of this.getNext()) {
            this.currentState.onExit?.();
            const value = next.value;
            const state = this.transitions.get(value[1])?.get(value[0]);
            state.onEnter?.();
            this.currentState = state;
        }
    }
}
