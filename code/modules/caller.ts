export class Caller<T extends (...args: any[]) => void> {
	#set = new Set<(parameters: Parameters<T>) => void>()

	callbacks: WeakSet<T> = Object.freeze({
		has: (t: T) => this.#set.has(t),
		add: (t: T) => this.#set.add(t),
		delete: (t: T) => this.#set.delete(t),
		[Symbol.toStringTag]: this.#set[Symbol.toStringTag],
	} as const)

	call(...parameters: Parameters<T>) {
		const copy = new Set(this.#set)
		copy.forEach(resolve => resolve?.(parameters))
	}

	get callBacksAsync(): Iterable<PromiseLike<Parameters<T>>> {
		return this.#callBacksAsync()
	}

	*#callBacksAsync() {
		while (true) {
			yield new Promise<Parameters<T>>(resolve => this.#set.add(resolve))
		}
	}
}
