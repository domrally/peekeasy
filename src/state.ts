
export interface Machineable {
	onEnter?(): void
	onExit?(): void
}
type Constructable<T extends symbol> = new (...args: any[]) => { state: State<T> }
type Input<S, T extends symbol> = new (...args: any[]) => S & { state: State<T>, onEnter?(): void, onExit?(): void }
type Output<S, T extends symbol> = new (...args: any[]) => S & AsyncIterable<T>
export function composeState<S, T extends symbol>(Base: Input<S, T>): Output<S, T>
export function composeState<S, T extends symbol, TBase extends Constructable<T>>(Base: TBase) {
	return class _ extends Base implements AsyncIterable<T> {
		async *[Symbol.asyncIterator]() {
			yield* this.state
		}
	}
}

// [Symbol.asyncIterator](): AsyncGenerator<T, void, unknown>
// trigger: (trigger: T) => void
export class State<T extends symbol> implements AsyncIterable<T> {
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
