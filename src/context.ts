//
export class Context<S extends object & AsyncIterable<S>> implements AsyncIterable<S> {
	// 
	async *[Symbol.asyncIterator]() {
		while (true) {
			const next = await this.currentState[Symbol.asyncIterator]().next()
			this.currentState = next.value
			yield this.currentState
		}
	}
	// 
	get target(): S & AsyncIterable<S> {
		this.#lazyInit?.()
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
	constructor(private currentState: S) { }
	// 
	#lazyInit: any = async () => {
		this.#lazyInit = null
		for await (this.currentState of this) { }
	}
}