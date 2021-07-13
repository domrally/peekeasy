import { Machineable } from './state.js';
// a context manages the state and transitions of a state machine
type M<S> = Machineable & S
export const createContext = <S extends AsyncIterable<T>, T extends symbol>(currentState: M<S>, transitions: Record<T, WeakMap<M<S>, M<S>>>) => {
	// 
	const asyncIterable = {
		async *[Symbol.asyncIterator]() {
			while (true) {
				const state = currentState
				const next = await currentState[Symbol.asyncIterator]().next()
				const trigger = next.value as T
				if (state === currentState) {
					const nextState = transitions[trigger].get(state) as M<S>
					currentState.onExit?.()
					nextState.onEnter?.()
					currentState = nextState
				}
				yield trigger
			}
		}
	};
	(async () => { for await (const _ of asyncIterable) { } })()
	//
	return {
		get: (_: S, key: any) => key === Symbol.iterator || key === Symbol.asyncIterator
			? (asyncIterable as any)[key]
			: (currentState as any)[key],
		set: (_: S, key: any, value: any) => (currentState as any)[key] = value
	}
}