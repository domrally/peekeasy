import { Machineable } from './state.js'
// a context manages the state and transitions of a state machine
type M<S> = Machineable & S
export class Context<S extends AsyncIterable<T>, T extends symbol> implements AsyncIterable<T> {
	// 
	async *[Symbol.asyncIterator]() {
		while (true) {
			const next = await this.currentState[Symbol.asyncIterator]().next()
			const trigger = next.value as T
			const nextState = this.transitions[trigger].get(this.currentState) as M<S>
			this.currentState.onExit?.()
			nextState.onEnter?.()
			this.currentState = nextState
			yield trigger
		}
	}
	// 
	get target(): S {
		return this.currentState
	}
	//
	get handler() {
		return {
			get: (_: S, key: any) => key === Symbol.asyncIterator || key === Symbol.iterator
				? (this as any)[key]
				: (this.currentState as any)[key],
			set: (_: S, key: any, value: any) => (this.currentState as any)[key] = value
		}
	}
	// 
	constructor(private currentState: M<S>, private transitions: Record<T, WeakMap<M<S>, M<S>>>) {
		(async () => {
			for await (const _ of this) { }
		})()
	}
}