export class WeakSetWrapper<T extends {}> implements WeakSet<T> {
	constructor (set: WeakSet<T>) {
		this.#set = set
	}

	has (t: T) {
		return this.#set.has(t)
	}
	
	add (t: T) {
		return this.#set.add(t) as any
	}
	
	delete (t: T) {
		return this.#set.delete(t) as any
	}
	
	get [Symbol.toStringTag] () {
		return this.#set[Symbol.toStringTag]
	}

	#set: WeakSet<T>
}
