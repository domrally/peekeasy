import { Custom } from './custom.js'
// a context manages the state and transitions of a state machine
export const handleContext = <S extends AsyncIterable<T>, T extends symbol>(currentState: M<S>, transitions: Record<T, WeakMap<S, S>>) => {
	const update = async () => {
		const state = currentState
		const asyncIterator = state[Symbol.asyncIterator]()
		const next = await asyncIterator.next()
		const trigger = next.value as T
		if (state === currentState) {
			currentState = customize(state, transitions[trigger])
		}

		return trigger
	}
	const asyncIterable = {
		async *[Symbol.asyncIterator]() {
			yield* generator(update)
		}
	}
	loop(asyncIterable)
	return {
		get: (_: S, key: any) => key === Symbol.iterator || key === Symbol.asyncIterator
			? (asyncIterable as any)[key]
			: (currentState as any)[key],
		set: (_: S, key: any, value: any) => (currentState as any)[key] = value
	}
}
type M<S> = Custom & S
const loop = async <T>(asyncIterable: AsyncIterable<T>) => { for await (const _ of asyncIterable) { } }
const generator = async function* <T>(update: () => Promise<T>) {
	while (true) {
		yield await update()
	}
}
const customize = <S extends object>(state: M<S>, stateMap: WeakMap<S, S>) => {
	// customize the context with custom actions
	state.onExit?.()
	const nextState = stateMap.get(state) as M<S>
	nextState.onEnter?.()
	return nextState
}
