import { State } from "./state.js"

//
export class Context<S extends object & State<S, T>, T> implements AsyncIterable<S> {
	// 
	async *[Symbol.asyncIterator]() {
		for await (const next of this.getNext()) {
			while (this.currentState != this.transitions.get(next.value as [S, T])) {
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
	constructor(private currentState: S, private transitions: Map<[S, T], S>) {
		this.init()
	}
	// 
	async init() {
		for await (const next of this.getNext()) {
			this.currentState.onExit()
			const state = this.transitions.get(next.value as [S, T]) as S
			state.onEnter()
			this.currentState = state
		}
	}
}