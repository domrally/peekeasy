// 
export abstract class State<S, T> implements AsyncIterable<[S, T]> {
	abstract onEnter(): void
	abstract onExit(): void
	// 
	async *[Symbol.asyncIterator]() {
		while (true) {
			yield await this.promise
		}
	}
	// 
	private promise: Promise<[S, T]>
	private get newPromise() {
		return new Promise<[S, T]>(resolve => this.#transition = resolve)
	}
	#transition: (nextState: [S, T]) => void
	// 
	constructor() {
		this.#transition = () => { }
		this.promise = this.newPromise
	}
	// 
	protected trigger(trigger: T) {
		const transition = this.#transition
		this.promise = this.newPromise
		transition([this as any, trigger])
	}
}
