import { Moore } from './moore.js';
//
export class Mealy {
    // 
    constructor(currentState, ...states) {
        this.currentState = currentState;
        this.handler = {
            get: (_, property) => {
                const proxied = property === Symbol.asyncIterator
                    ? this._asyncIterable[Symbol.asyncIterator]
                    : this.currentState[property];
                return proxied;
            },
            set: (_, property, value) => this.currentState[property] = value
        };
        this._lazyInit = async () => {
            this._lazyInit = null;
            // 
            for await (this.currentState of this._asyncIterable) { }
        };
        this._asyncIterable = new Moore([currentState, ...states]);
    }
    get target() {
        this._lazyInit?.();
        return this.currentState;
    }
}
