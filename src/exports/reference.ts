import { error } from 'console'
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
		try {
			value.add?.(() => (state = value))
		} catch (message) {
			error(
				`Problem adding state listener "${value}" to Reference:\n${message}`
			)
		}
	}

	return new Proxy(() => {}, {
		apply(_, thisArg, args) {
			try {
				return state.apply(thisArg, args)
			} catch (message) {
				error(`Problem applying Reference to state function:\n${message}`)
			}
		},
		get(_, key) {
			try {
				return state[key]
			} catch (message) {
				error(
					`Problem getting Reference to state property "${
						key as string
					}":\n${message}`
				)
			}
		},
		set(_, key, value) {
			try {
				state[key] = value

				return true
			} catch (message) {
				error(
					`Problem setting state property "${
						key as string
					}" on Reference:\n${message}`
				)

				return false
			}
		},
	})
} as unknown as new <T extends Delegate>(...states: T[]) => Reference<T>
