type ValuesWithKeys<T, K extends keyof T> = T[K]
type Machineable = { onEnter?(): void, onExit?(): void }
export type createTriggers<T> = ValuesWithKeys<T, keyof T>
export const composeState: <S, T extends symbol>(Base: new (...args: any[]) => S & { state: State<T>, onEnter?(): void, onExit?(): void }) => new (...args: any[]) => S & AsyncIterable<T> = (window as any).createState
export const createProxy: <S, T extends symbol>(initialState: S & Machineable & AsyncIterable<T>, transitions: Record<T, [S & Machineable & AsyncIterable<T>, S & Machineable & AsyncIterable<T>][]>) => S & AsyncIterable<S> = (window as any).createProxy
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
