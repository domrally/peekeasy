//
export interface IState<S, T> {
	[Symbol.asyncIterator](): AsyncGenerator<[S, T], void, unknown>
	onEnter?(): void
	onExit?(): void
}
export abstract class State<S, T> implements IState<S, T>, AsyncIterable<[S, T]> {
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
