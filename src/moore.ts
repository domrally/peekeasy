//
export class Moore<S extends { promise: PromiseLike<S> }> implements AsyncIterable<Readonly<S>> {
	#asyncIterator: () => AsyncIterator<S>
	get [Symbol.asyncIterator]() {
		this.#lazyInit?.()
		return this.#asyncIterator
	}
	// 
	constructor(private states: S[]) {
		this.#asyncIterator = this.#getAsyncIterator()
	}
	#setResult: (result: IteratorResult<S>) => void = () => { }
	readonly #getAsyncIterator = () => {
		const promise = new Promise<IteratorResult<S>>(resolve => this.#setResult = resolve)
		const getPromise = () => promise
		const asyncIterator = { next: getPromise }
		const getAsyncIterator = () => asyncIterator
		return getAsyncIterator
	}
	#lazyInit: any = async () => {
		this.#lazyInit = null
		const getNextValue = () => {
			this.#asyncIterator = this.#getAsyncIterator()
			const asyncIterable = this.states.map(s => s.promise)
			return Promise.race(asyncIterable)
		}
		while (true) {
			const value = await getNextValue()
			this.#setResult?.({ value, done: false })
		}
	}
}
