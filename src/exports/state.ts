import { Event } from './exports'

export type State<T> = T
export const State = function <T extends Partial<Event<[]>>>(
	states: IterableIterator<T>
) {
	states.next ??= states[Symbol.iterator]().next.bind(states[Symbol.iterator]())

	for (const state of states) {
		state.add?.(() => (states.next = () => ({ value: state })))
	}

	const apply = (_: T, thisArg: any, args: any[]) => {
		let result

		for (const state of states) {
			const r = (state as any).apply(thisArg, args)

			if (states.next().value !== state) continue

			result = r
		}

		return result
	}

	const get = (_: T, key: PropertyKey) => {
		return states.next().value[key]
	}

	const set = (_: T, key: PropertyKey, value: T[any]) => {
		for (const state of states) {
			;(state as any)[key] = value
		}

		return true
	}

	return new Proxy<any>(() => {}, {
		apply,
		get,
		set,
	})
} as unknown as new <T extends Partial<Event<[]>>>(
	states: Iterable<T>
) => State<T>
