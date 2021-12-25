export class WeakerSet<T extends {}> implements WeakSet<T> {
	constructor (weak: WeakSet<T>) {
		this.#weak = weak
	}

	has (t: T) {
		return this.#weak.has(t)
	}
	
	add (t: T) {
		return this.#weak.add(t) as any
	}
	
	delete (t: T) {
		return this.#weak.delete(t) as any
	}
	
	get [Symbol.toStringTag] () {
		return this.#weak[Symbol.toStringTag]
	}

	#weak: WeakSet<T>
}
