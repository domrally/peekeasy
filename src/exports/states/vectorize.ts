import { Event } from '../exports'

/**
 * Creates and manages a state pattern based on a target set of possible states
 * @param target state of the returned object
 * @param states array of states that can be activated
 * @returns a state without the extended event interface
 */
export function vectorize<T extends Event<[]>>(
	target: T,
	...states: T[]
): Omit<T, keyof Event<[]>> {
	let current: any = target

	states = [target, ...states]

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

/**
 * creates a function that executes the function on all states
 * @param value current state property value
 * @param values all state property values
 * @returns an object either containing the current parameter value or an object to interact with all states
 */
function result<T extends (...args: any[]) => any>(value: T, values: T[]): any {
	return typeof value === 'function'
		? (...params: Parameters<T>) => {
				const index = values.indexOf(value),
					results = values.map(v => v(...params))

				return results[index]
		  }
		: value
}
