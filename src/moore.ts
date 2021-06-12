//
export class Moore<S> implements AsyncIterable<S> {
	[Symbol.asyncIterator]: () => AsyncIterator<S>
	// 
	constructor(...states: PromiseLike<S>[]) {
		let setResult: (result: IteratorResult<S>) => void
		const getNextValue = () => {
			const promise = new Promise<IteratorResult<S>>(resolve => setResult = resolve)
			const getPromise = () => promise
			const asyncIterator = { next: getPromise }
			const getAsyncIterator = () => asyncIterator
			this[Symbol.asyncIterator] = getAsyncIterator

			return Promise.race(states)
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
