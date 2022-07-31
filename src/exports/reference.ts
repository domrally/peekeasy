import { Delegate } from './delegate'

/**
 * ### Description
 *
 * Calls actions on a set of listeners
 *
 * _example_
 *
 * ```ts
 * import { Reference } from 'peekeasy'
 *
 * const { log } = console,
 * 	object: [string] = [],
 * 	reference = new Reference(object)
 *
 * object[0] = 'Hello, world!'
 *
 * // Hello, world!
 * log(reference[0])
 * ```
 *
 */
export type Reference<T extends Delegate> = T
/**
 * #### constructor
 *
 * @param states permitted states of the state pattern
 *
 */
export const Reference = function (...states: any[]) {
	let [state] = states

	for (const value of states) {
		value.add?.(() => (state = value))
	}

	return new Proxy(() => {}, {
		apply(_, thisArg, args) {
			return state.apply(thisArg, args)
		},
		get(_, key) {
			return state[key]
		},
		set(_, key, value) {
			state[key] = value

			return true
		},
	})
} as unknown as new <T extends Delegate>(...states: T[]) => Reference<T>
