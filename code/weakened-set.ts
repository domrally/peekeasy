export class WeakenedSet implements WeakSet< () => void > {
	has( t: () => void ) {
		return this.#delegates.has( t )
	}
	
	add( t: () => void ) {
		return this.#delegates.add( t ) as any
	}
	
	delete( t: () => void ) {
		return this.#delegates.delete( t ) as any
	}
	
	get [ Symbol.toStringTag ]() {
		return this.#delegates[ Symbol.toStringTag ]
	}

	constructor( delegates: WeakSet< () => void > ) {
		this.#delegates = delegates
	}

	#delegates: WeakSet< () => void >
}
