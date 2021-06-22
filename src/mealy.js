import { Moore } from './moore.js';
//
export class Mealy {
    // 
    constructor(currentState, ...states) {
        this.currentState = currentState;
        this.handler = {
            get: (_, property) => {
                const proxied = property === Symbol.asyncIterator
                    ? this.#asyncIterable[Symbol.asyncIterator]
                    : this.currentState[property];
                return proxied;
            },
            set: (_, property, value) => this.currentState[property] = value
        };
        this.#lazyInit = async () => {
            this.#lazyInit = null;
            // 
            for await (this.currentState of this.#asyncIterable) { }
        };
        this.#asyncIterable = new Moore([currentState, ...states]);
    }
    get target() {
        this.#lazyInit?.();
        return this.currentState;
    }
    #asyncIterable;
    #lazyInit;
}
