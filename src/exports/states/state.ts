import { WeakEvent } from '../exports'

/**
 * Creates and manages a state pattern based on an initial set of possible states
 * @param initial state of the returned object
 * @param states array of states that can be activated
 * @returns a state without the extended event interface
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
 * creates a function that executes the function on all states
 * @param value current state property value
 * @param values all state property values
 * @returns an object either containing the current parameter value or an object to interact with all states
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
