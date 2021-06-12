//
export class Moore {
    // 
    constructor(...states) {
        let setResult;
        const getNextValue = () => {
            const promise = new Promise(resolve => setResult = resolve);
            const getPromise = () => promise;
            const asyncIterator = { next: getPromise };
            const getAsyncIterator = () => asyncIterator;
            this[Symbol.asyncIterator] = getAsyncIterator;
            const asyncIterable = states.map(s => s.promise);
            return Promise.race(asyncIterable);
        };
        const loop = async () => {
            while (true) {
                const value = await getNextValue();
                setResult?.({ value, done: false });
            }
        };
        loop();
    }
}
