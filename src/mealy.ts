import { Moore } from './moore.js'
//
export class Mealy<S extends object & AsyncIterable<S>> {
	get target() {
		this._lazyInit?.()
		return this.currentState
	}
	readonly handler = {
		get: (_: S, property: any) => {
			const proxied = property === Symbol.asyncIterator
				? this._asyncIterable[Symbol.asyncIterator]
				: (this.currentState as any)[property]
			return proxied
		},
		set: (_: S, property: any, value: any) => (this.currentState as any)[property] = value
	} as const
	// 
	constructor(private currentState: S, ...states: S[]) {
		this._asyncIterable = new Moore([currentState, ...states])
	}
	_asyncIterable: AsyncIterable<S>
	_lazyInit: any = async () => {
		this._lazyInit = null
		// 
		for await (this.currentState of this._asyncIterable) { }
	}
}
