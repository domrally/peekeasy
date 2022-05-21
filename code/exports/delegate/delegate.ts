import type { VoidFunction } from './void-function'
import type { ProxySet } from './proxy-set'

export class Delegate<T extends any[] = []> {
	#set = new Set<VoidFunction<T>>()

	send: VoidFunction<T> = ((...parameters: T) => {
		const copy = new Set(this.#set)
		copy.forEach(resolve => resolve?.(...parameters))
	}).bind(this)

	callbacks: ProxySet<T> = Object.freeze({
		has: (t: VoidFunction<T>) => this.#set.has(t),
		add: (t: VoidFunction<T>) => this.#set.add(t),
		delete: (t: VoidFunction<T>) => this.#set.delete(t),
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
