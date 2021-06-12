//
export class Moore {
    // 
    constructor(states) {
        this.states = states;
        this.loop = async () => {
            const getNextValue = () => {
                const promise = new Promise(resolve => this.setResult = resolve);
                const getPromise = () => promise;
                const asyncIterator = { next: getPromise };
                const getAsyncIterator = () => asyncIterator;
                this[Symbol.asyncIterator] = getAsyncIterator;
                const asyncIterable = this.states.map(s => s.promise);
                return Promise.race(asyncIterable);
            };
            while (true) {
                const value = await getNextValue();
                this.setResult?.({ value, done: false });
            }
        };
        this.setResult = (_result) => { };
    }
}
