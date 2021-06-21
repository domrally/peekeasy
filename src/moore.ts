//
export class Moore<S extends AsyncIterable<S>> implements AsyncIterable<S> {
	get [Symbol.asyncIterator]() {
		this.#lazyInit?.()
		return this.#asyncIterator
	}
	// 
	constructor(private states: S[]) { }

	#setResult: (result: IteratorResult<S>) => void = () => { }
	readonly #getAsyncIterator = () => {
		const promise = new Promise<IteratorResult<S>>(resolve => this.#setResult = resolve)
		const getPromise = () => promise
		const asyncIterator = { next: getPromise }
		const getAsyncIterator = () => asyncIterator
		return getAsyncIterator
	}
	#asyncIterator: () => AsyncIterator<S> = this.#getAsyncIterator()
	#lazyInit: any = async () => {
		this.#lazyInit = null
		while (true) {
			const value = await Promise.race(this.states) as S
			const setResult = this.#setResult
			this.#asyncIterator = this.#getAsyncIterator()
			setResult({ value, done: false })
		}
	}
}
