// 
export abstract class State<S> implements AsyncIterable<S> {
	// 
	async *[Symbol.asyncIterator]() {
		while (true) {
			yield await this.promise
		}
	}
	// 
	promise: Promise<S>
	#setState: (state: S) => void
	// 
	constructor() {
		this.#setState = () => { }
		this.promise = new Promise<S>(resolve => this.#setState = resolve)
	}
	//
	protected get setState(): (state: S) => void {
		const setState = this.#setState
		this.promise = new Promise<S>(resolve => this.#setState = resolve)
		return setState
	}
}
