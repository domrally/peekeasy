//
export class Moore {
    // 
    constructor(states) {
        this.states = states;
        this.#setResult = () => { };
        this.#nextPromise = new Promise(resolve => this.#setResult = resolve);
        this.#asyncIterator = () => {
            return {
                next: () => this.#nextPromise
            };
        };
        this.#lazyInit = async () => {
            this.#lazyInit = null;
            while (true) {
                const value = await Promise.race(this.states);
                const setResult = this.#setResult;
                this.#nextPromise = new Promise(resolve => this.#setResult = resolve);
                setResult({ value, done: false });
            }
        };
    }
    get [Symbol.asyncIterator]() {
        this.#lazyInit?.();
        return this.#asyncIterator;
    }
    #setResult;
    #nextPromise;
    #asyncIterator;
    #lazyInit;
}
