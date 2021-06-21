import { Moore } from './moore.js'
//
export class Mealy<S extends object & { promise: PromiseLike<S> }> {
	#target: AsyncIterable<S> & S
	get target() {
		return this.#target
	}
	readonly handler = {
		get: (_: AsyncIterable<S> & S, property: any) => {
			this.#lazyInit?.()
			const proxy = property === Symbol.asyncIterator
				? this.moore[Symbol.asyncIterator]
				: (this.currentState as any)[property]
			return proxy
		},
		set: (_: AsyncIterable<S> & S, property: any, value: any) => (this.currentState as any)[property] = value
	}
	private moore: Moore<S>
	// 
	constructor(private currentState: S, ...states: S[]) {
		this.moore = new Moore([currentState, ...states])
		this.#target = Object.assign<AsyncIterable<S>, S>(this.moore, currentState)
	}
	#lazyInit: any = async () => {
		this.#lazyInit = null
		// 
		for await (this.currentState of this.moore) { }
	}
}
