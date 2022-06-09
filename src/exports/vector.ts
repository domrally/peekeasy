import { Event, State } from './exports'

export type Vector<T> = (() => State<T>) & { [K in keyof T]: Vector<T[K]> }
export const Vector = function <T extends Event<[]>>(...states: T[]) {
	let value = states[Symbol.iterator]?.().next().value

	for (const state of states) {
		state.add?.(() => (value = state))
	}

	const apply = (_: any) => new State(states)

	const get = (_: T, property: PropertyKey) => {
		const values = new Set<T>()

		for (const state of states) {
			const value = (state as any)[property]

			values.add(value)
		}

		return new Vector(values)
	}

	return new Proxy(() => {}, {
		apply,
		get,
	})
} as unknown as new <T extends Partial<Event<[]>>>(
	states: Iterable<T>
) => Vector<T>
