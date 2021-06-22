import { Moore } from './moore.js'
//
export class Mealy<S extends object & AsyncIterable<S>> {
	get target() {
		return this.currentState
	}
	readonly handler = {
		get: (_: S, property: any) => {
			this.#lazyInit?.()
			const proxied = property === Symbol.asyncIterator
				? this.#asyncIterable[Symbol.asyncIterator]
				: (this.currentState as any)[property]
			return proxied
		},
		set: (_: S, property: any, value: any) => (this.currentState as any)[property] = value
	} as const
	// 
	constructor(private currentState: S, ...states: S[]) {
		this.#asyncIterable = new Moore([currentState, ...states])
	}
	#asyncIterable: AsyncIterable<S>
	#lazyInit: any = async () => {
		this.#lazyInit = null
		// 
		for await (this.currentState of this.#asyncIterable) { }
	}
}
