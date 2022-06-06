import { WeakEvent } from '../exports'

/**
 * Manages the state pattern
 * @param initial initial state before any other states are activated
 * @param states states that can be activated
 * @returns a state without the event
 */
export function State<T extends WeakEvent<[]>>(
	initial: T,
	...states: T[]
): Omit<T, keyof WeakEvent<[]>> {
	let current: any = initial

	states = [initial, ...states]

	for (const state of states) {
		state.add(() => (current = state))
	}

	const proxyHandler: ProxyHandler<T> = {
		apply: (_: T, thisArg: T, args: any[]) => {
			const others: any = states.filter(state => state !== current)

			for (const other of others) {
				other.apply?.(thisArg, args)
			}

			return current.apply?.(thisArg, args)
		},
		get: (_: T, property: PropertyKey) =>
			result(
				current[property],
				states.map((s: any) => s[property])
			),
		set: (_: T, property: PropertyKey, value: any) => {
			for (const state of states) {
				;(state as any)[property] = value
			}

			return true
		},
	}

	return new Proxy({} as any, proxyHandler)
}
export default State

/**
 * Returns the result of the function or the first truthy value
 * @param value initial state before any other states are activated
 * @param values states that can be activated
 * @returns a state without the event
 */
function result<T>(value: T, values: T[]): any {
	return typeof value === 'function'
		? (...params: Parameters<typeof result>) => {
				const copy: any[] = values.filter(v => v !== value)

				const r = value(...params)

				copy.forEach(c => c(...params))

				return r
		  }
		: value
}
