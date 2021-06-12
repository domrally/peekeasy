//
export class Moore<S extends { promise: PromiseLike<S> }> implements AsyncIterable<Readonly<S>> {
	[Symbol.asyncIterator]: () => AsyncIterator<S>
	// 
	constructor(...states: S[]) {
		let setResult: (result: IteratorResult<S>) => void
		const getNextValue = () => {
			const promise = new Promise<IteratorResult<S>>(resolve => setResult = resolve)
			const getPromise = () => promise
			const asyncIterator = { next: getPromise }
			const getAsyncIterator = () => asyncIterator
			this[Symbol.asyncIterator] = getAsyncIterator

			const asyncIterable = states.map(s => s.promise)
			return Promise.race(asyncIterable)
		}
		const loop = async () => {
			while (true) {
				const value = await getNextValue()
				setResult?.({ value, done: false })
			}
		}
		loop()
	}
}
