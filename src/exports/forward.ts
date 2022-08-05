import { error } from 'console'
import { Action } from './exports'

/**
 * ### Description
 *
 * Calls actions on a set of listeners
 *
 * _example_
 *
 * ```ts
 * import { Forward } from 'peekeasy'
 *
 * const { log } = console,
 *    forward = new Forward('Hello, world!')
 *
 * // Hello, world!
 * forward.add(log)
 * ```
 *
 */
export type Forward<T extends any[] = []> = Action<T> & Set<Action<T>>
/**
 * #### constructor
 *
 * @param initial optional data that can be passed to the listeners immediately
 *
 */
export const Forward = function <T extends any[]>(...listeners: Action<T>[]) {
	const set = new Set<Action<T>>(listeners),
		forward = (...args: T) => {
			try {
				new Set<Action<T>>(set).forEach(action => action(...args))
			} catch (message) {
				error(`Problem forwarding message to listeners:\n${message}`)
			}
		}

	forward.add = (listener: Action<T>) => {
		try {
			const result = set.add(listener)

			forward.size = set.size

			return result
		} catch (message) {
			error(`Problem adding listener for Forwarding:\n${message}`)

			return forward
		}
	}

	forward.clear = () => {
		try {
			set.clear()

			forward.size = set.size
		} catch (message) {
			error(`Problem clearing listeners from Forwarding:\n${message}`)
		}
	}

	forward.delete = (listener: Action<T>) => {
		try {
			const result = set.delete(listener)

			forward.size = set.size

			return result
		} catch (message) {
			error(`Problem deleting listener from Forwarding:\n${message}`)

			return false
		}
	}

	forward.forEach = (
		callbackfn: (
			listener: Action<T>,
			listener2: Action<T>,
			set: Set<Action<T>>
		) => void,
		thisArg?: unknown
	) => {
		try {
			set.forEach(callbackfn, thisArg)
		} catch (message) {
			error(
				`Problem calling back for each listener Forwarded listener:\n${message}`
			)
		}
	}

	forward.has = (listener: Action<T>) => {
		try {
			return set.has(listener)
		} catch (message) {
			error(`Problem checking if Forward has listener:\n${message}`)

			return false
		}
	}

	forward.size = set.size

	return forward
} as unknown as new <T extends any[] = []>(
	...listeners: Action<T>[]
) => Forward<T>
