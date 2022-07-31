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
export type Forward<params extends any[] = []> = Action<params> &
	Set<Action<params>>
/**
 * #### constructor
 *
 * @param initial optional data that can be passed to the listeners immediately
 *
 */
export const Forward = function <params extends any[]>(...initial: params) {
	const set = new Set<Action<params>>(),
		forward = (...args: params) => {
			try {
				new Set<Action<params>>(set).forEach(action => action(...args))
			} catch (message) {
				throw new Error(`Problem forwarding message to listeners:\n${message}`)
			}
		}

	forward.add = (listener: Action<params>) => {
		try {
			const result = set.add(listener)

			forward.size = set.size

			if (initial) listener(...initial)

			return result
		} catch (message) {
			throw new Error(`Problem adding listener for Forwarding:\n${message}`)
		}
	}

	forward.clear = () => {
		try {
			const result = set.clear()

			forward.size = set.size

			return result
		} catch (message) {
			throw new Error(`Problem clearing listeners from Forwarding:\n${message}`)
		}
	}

	forward.delete = (listener: Action<params>) => {
		try {
			const result = set.delete(listener)

			forward.size = set.size

			return result
		} catch (message) {
			throw new Error(`Problem deleting listener from Forwarding:\n${message}`)
		}
	}

	forward.forEach = (
		callbackfn: (
			listener: Action<params>,
			listener2: Action<params>,
			set: Set<Action<params>>
		) => void,
		thisArg?: unknown
	) => {
		try {
			set.forEach(callbackfn, thisArg)
		} catch (message) {
			throw new Error(
				`Problem calling back for each listener Forwarded listener:\n${message}`
			)
		}
	}

	forward.has = (listener: Action<params>) => {
		try {
			return set.has(listener)
		} catch (message) {
			throw new Error(`Problem checking if Forward has listener:\n${message}`)
		}
	}

	forward.size = set.size

	return forward
} as unknown as new <params extends any[] = []>(
	...initial: params
) => Forward<params>
