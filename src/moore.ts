//
export class Moore<S extends AsyncIterable<S>> implements AsyncIterable<S> {
	get [Symbol.asyncIterator]() {
		this.#lazyInit?.()
		return this.#asyncIterator
	}
	// 
	constructor(private states: S[]) { }

	#setResult: (result: IteratorResult<S>) => void = () => { }
	#nextPromise: Promise<IteratorResult<S>> = new Promise(resolve => this.#setResult = resolve)
	readonly #asyncIterator = () => {
		return {
			next: () => this.#nextPromise
		}
	}
	#lazyInit: any = async () => {
		this.#lazyInit = null
		while (true) {
			const value = await Promise.race(this.states) as S
			const setResult = this.#setResult
			this.#nextPromise = new Promise(resolve => this.#setResult = resolve)
			setResult({ value, done: false })
		}
	}
}
