import { State } from './state.js'
import { TransitionMap } from './transitions.js'
//
export class Context<S extends object & State<S, T>, T extends number> implements AsyncIterable<S> {
	// 
	async *[Symbol.asyncIterator]() {
		for await (const next of this.getNext()) {
			const value = next.value as [S, T]
			while (this.currentState != this.transitions.get(value[1])?.get(value[0]) as S) {
				await new Promise<void>(r => requestAnimationFrame(() => r()))
			}
			yield this.currentState
		}
	}
	private async *getNext() {
		while (true) {
			yield await this.currentState[Symbol.asyncIterator]().next()
		}
	}
	// 
	get target(): S & AsyncIterable<S> {
		const target = Object.assign({}, this.currentState, this)
		return target
	}
	// 
	get handler() {
		return {
			get: (_: S, property: any) => (this.currentState as any)[property],
			set: (_: S, property: any, value: any) => (this.currentState as any)[property] = value
		}
	}
	// 
	constructor(private currentState: S, private transitions: TransitionMap<S, T>) {
		this.init()
	}
	// 
	async init() {
		for await (const next of this.getNext()) {
			this.currentState.onExit()
			const value = next.value as [S, T]
			const state = this.transitions.get(value[1])?.get(value[0]) as S
			state.onEnter()
			this.currentState = state
		}
	}
}