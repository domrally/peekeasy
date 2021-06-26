import { Transition } from "./transition"
// 
export abstract class State<S, T extends Transition> implements AsyncIterable<S> {
	// 
	async *[Symbol.asyncIterator]() {
		while (true) {
			yield await this.promise
		}
	}
	// 
	private promise: Promise<S>
	#transition: (nextState: S) => void
	// 
	constructor() {
		this.#transition = () => { }
		this.promise = new Promise<S>(resolve => this.#transition = resolve)
	}
	//
	protected raise(trigger: T) {
		const transition = this.#transition
		this.promise = new Promise<S>(resolve => this.#transition = resolve)
		transition(trigger[this])
	}
}
