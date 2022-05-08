import type { Call } from './call'
import type { CallSet } from './call-set'

export class Caller<T extends any[] = []> {
	#set = new Set<Call<T>>()

	call: Call<T> = ((...parameters: T) => {
		const copy = new Set(this.#set)
		copy.forEach(resolve => resolve?.(...parameters))
	}).bind(this)

	callbacks: CallSet<T> & Iterable<PromiseLike<T>> =
		Object.freeze({
			has: (t: Call<T>) => this.#set.has(t),
			add: (t: Call<T>) => this.#set.add(t),
			delete: (t: Call<T>) => this.#set.delete(t),
			[Symbol.toStringTag]: this.#set[Symbol.toStringTag],
			[Symbol.iterator]: () => this.#callbacks(),
		} as const);

	*#callbacks() {
		while (true) {
			yield new Promise<T>(resolve =>
				this.#set.add((...args: T) => resolve(args))
			)
		}
	}
}
