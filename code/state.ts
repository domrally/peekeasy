import { Eventable, Events } from './events.js'
export interface state<T extends Eventable> extends AsyncIterable<Events<T>> {
	trigger: (event: Events<T>) => void
}
// factory pattern returning an instance of the State interface
export const state = <T extends Eventable>() => new _<T>() as state<T>
class _<T extends Eventable> implements state<T> {
	#trigger = (_trigger: Events<T>) => { }
	get trigger() { return this.#trigger }
	// 
	#promise: Promise<Events<T>> = this.#newPromise
	// 
	async *[Symbol.asyncIterator]() {
		while (true) {
			yield await this.#promise
		}
	}
	get #newPromise() {
		return new Promise<Events<T>>(resolve => this.#trigger = (trigger: Events<T>) => {
			this.#promise = this.#newPromise
			resolve(trigger)
		})
	}
}
