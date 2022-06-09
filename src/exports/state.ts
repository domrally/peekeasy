import { Delegate } from './delegate'
import { Event } from './event'

export type State<T> = T
export const State = {} as new <T extends Partial<Event<[]>>>(states: Iterable<T>) => State<T>
State.constructor = <T extends Partial<Event<[]>>>(states: Iterable<T>) => {
	let value = states[Symbol.iterator]?.().next().value

	for (const state of states) {
		state.add?.(() => value = state)
	}

	const apply = (_: T, thisArg: any, args: any[]) => {
		let result

		for (const state of states) {
			const r = (state as any).apply(thisArg, args)

			if (value !== state) continue

			result = r
		}

		return result
	}

	const get = (_: T, key: PropertyKey) => {
		return value[key]
	}

	const set = (_: T, key: PropertyKey, value: T[any]) => {
		for (const state of states) {
			;(state as any)[key] = value
		}

		return true
	}

	return new Proxy<any>({}, {
		apply,
		get,
		set,
	})
}
