import { Event } from './exports'

export interface Vector<T extends Event<[]>> extends Set<T> {
	(): T
}
/**
 * Creates and manages a state pattern based on a target set of possible states
 * @param target state of the returned object
 * @param states array of states that can be activated
 * @returns a state without the extended event interface
 */
export class Vector<T extends Event<[]>> extends Set<T> {
	constructor(target: T, ...states: T[]) {
		super([target, ...states])

		let current = target

		for (const state of this) {
			state.add(() => (current = state))
		}

		const proxy = new Proxy(
			target,
			proxyHandler(() => current, ...this)
		)

		const get = () => proxy
		Object.assign(get, this)

		return get as unknown as this
	}
}

function proxyHandler<T extends {}>(
	target: () => any,
	...states: T[]
): ProxyHandler<T> {
	return {
		apply: (_: T, thisArg: T, args: any[]) => {
			const others: any = states.filter(state => state !== target())

			for (const other of others) {
				other.apply?.(thisArg, args)
			}

			return target().apply?.(thisArg, args)
		},
		get: (_: T, property: PropertyKey) => {
			const values = states.map((s: any) => s[property])
			return result(values[states.indexOf(target())], values)
		},
		set: (_: T, property: PropertyKey, value: any) => {
			for (const state of states) {
				;(state as any)[property] = value
			}

			return true
		},
	}
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
