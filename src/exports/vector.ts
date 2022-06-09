import { Event, State } from './exports'

export type Vector<T> = (() => State<T>) & { [K in keyof T]: Vector<T[K]> }
export const Vector = function <T extends Event<[]>>(
	states: IterableIterator<T>
) {
	states.next ??= states[Symbol.iterator]().next.bind(states[Symbol.iterator]())

	for (const state of states) {
		state.add?.(() => (states.next = () => ({ value: state })))
	}

	const apply = () => new State(states)

	const get: any = (_: T, key: PropertyKey) => {
		const values: any[] = []

		for (const state of states) {
			const v = (state as any)[key]

			values.push(v)
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
