import { Moore } from './moore.js'
//
export class Mealy<S extends object & { promise: PromiseLike<S> }> {
	readonly target: AsyncIterable<S> & S
	readonly handler = {
		get: (_: AsyncIterable<S> & S, property: any) => {
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
		this.target = Object.assign<AsyncIterable<S>, S>(this.moore, currentState)
		const loop = async () => {
			// 
			for await (currentState of this.moore) { }
		}
		loop()
	}
}
