import { Custom } from './custom.js'
// a context manages the state and transitions of a state machine
export const handleContext = <S extends AsyncIterable<T>, T extends symbol>(currentState: M<S>, transitions: Record<T, WeakMap<S, S>>) => {

	const context = new Context(async () => {

		const state = currentState
		const asyncIterator = state[Symbol.asyncIterator]()
		const next = await asyncIterator.next()
		const trigger = next.value as T

		if (state === currentState) {
			state.onExit?.()
			const stateMap = transitions[trigger]
			const nextState = stateMap.get(state) as M<S>
			nextState.onEnter?.()
			currentState = nextState
		}

		return trigger
	})

	return {
		get: (_: S, key: any) => key === Symbol.iterator || key === Symbol.asyncIterator
			? (context as any)[key]
			: (currentState as any)[key],
		set: (_: S, key: any, value: any) => (currentState as any)[key] = value
	}
}
type M<S> = Custom & S
class Context<T> implements AsyncIterable<T> {
	constructor(private getNextTrigger: () => Promise<T>) { }
	async *[Symbol.asyncIterator]() {
		while (true) {
			yield await this.getNextTrigger()
		}
	}
}
