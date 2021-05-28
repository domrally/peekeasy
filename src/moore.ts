// 
export class Moore<S> implements AsyncIterable<S> {
    private promise: Promise<IteratorResult<S>> = Promise.reject()
    // 
    constructor(...states: PromiseLike<S>[]) {
        (async () => {
            while (true) {
                let resolve: (result: IteratorResult<S>) => void = () => {}
                this.promise = new Promise(r => resolve = r)
                const value = await Promise.race(states)
                resolve?.({ value, done: false })
            }
        })()
    }
    [Symbol.asyncIterator](): AsyncIterator<S, any, undefined> {
        return {
            next: async () => {
                return this.promise
            }
        }
    }
}
