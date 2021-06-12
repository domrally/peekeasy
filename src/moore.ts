//
export class Moore<S extends { promise: PromiseLike<S> }> implements AsyncIterable<Readonly<S>> {
	[Symbol.asyncIterator]: () => AsyncIterator<S>
	private setResult: (result: IteratorResult<S>) => void
	loop = async () => {
		const getNextValue = () => {
			const promise = new Promise<IteratorResult<S>>(resolve => this.setResult = resolve)
			const getPromise = () => promise
			const asyncIterator = { next: getPromise }
			const getAsyncIterator = () => asyncIterator
			this[Symbol.asyncIterator] = getAsyncIterator

			const asyncIterable = this.states.map(s => s.promise)
			return Promise.race(asyncIterable)
		}
		while (true) {
			const value = await getNextValue()
			this.setResult?.({ value, done: false })
		}
	}
	// 
	constructor(private states: S[]) {
		this.setResult = (_result: IteratorResult<S>) => { }
	}
}
