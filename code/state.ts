
export interface State<T extends symbol> extends AsyncIterable<T> {
	trigger: (event: T) => void
}
export const State = <S extends symbol>() => {
	return new _<S>() as State<S>
}
class _<T extends symbol> implements State<T> {
	#trigger = (_trigger: T) => { }
	get trigger() { return this.#trigger }
	// 
	#promise: Promise<T> = this.#newPromise
	// 
	async *[Symbol.asyncIterator]() {
		while (true) {
			yield await this.#promise
		}
	}
	get #newPromise() {
		return new Promise<T>(resolve => this.#trigger = (trigger: T) => {
			this.#promise = this.#newPromise
			resolve(trigger)
		})
	}
}
