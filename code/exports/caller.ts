export class Caller<T extends any[] = []> {
	#set = new Set<(...args: T) => void>()

	call: (...args: T) => void = ((...parameters: T) => {
		const copy = new Set(this.#set)
		copy.forEach(resolve => resolve?.(...parameters))
	}).bind(this)

	callbacks: WeakSet<(...args: T) => void> & Iterable<PromiseLike<T>> =
		Object.freeze({
			has: (t: (...args: T) => void) => this.#set.has(t),
			add: (t: (...args: T) => void) => this.#set.add(t),
			delete: (t: (...args: T) => void) => this.#set.delete(t),
			[Symbol.toStringTag]: this.#set[Symbol.toStringTag],
			[Symbol.iterator]: () => this.#callbacksAsync(),
		} as const);

	*#callbacksAsync() {
		while (true) {
			yield new Promise<T>(resolve =>
				this.#set.add((...args: T) => resolve(args))
			)
		}
	}
}
