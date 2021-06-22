//
export class Moore {
    // 
    constructor(states) {
        this.states = states;
        this._setResult = () => { };
        this._nextPromise = new Promise(resolve => this._setResult = resolve);
        this._asyncIterator = () => {
            return {
                next: () => this._nextPromise
            };
        };
        this._lazyInit = async () => {
            this._lazyInit = null;
            while (true) {
                const value = await Promise.race(this.states);
                const setResult = this._setResult;
                this._nextPromise = new Promise(resolve => this._setResult = resolve);
                setResult({ value, done: false });
            }
        };
    }
    get [Symbol.asyncIterator]() {
        this._lazyInit?.();
        return this._asyncIterator;
    }
}
