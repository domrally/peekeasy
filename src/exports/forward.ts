import { Action } from './exports'

/**
 * ### Description:
 *
 * A function that sends a message to all set members
 *
 * _example_
 * ```ts
 * ```
 *
 * @param args tuple of data that is passed to the listeners
 */
export type Forward<params extends any[] = []> = Action<params> &
	Set<Action<params>>
/**
 * #### constructor function:
 * @param initial optional data that can be passed to the listeners immediately
 */
export const Forward = function <params extends any[]>(...initial: params) {
	const set = new Set<Action<params>>(),
		forward = (...args: params) => {
			new Set<Action<params>>(set).forEach(action => action(...args))
		}

	forward.add = (value: Action<params>) => {
		const result = set.add(value)

		forward.size = set.size

		if (initial) value(...initial)

		return result
	}

	forward.clear = () => {
		const result = set.clear()

		forward.size = set.size

		return result
	}

	forward.delete = (value: Action<params>) => {
		const result = set.delete(value)

		forward.size = set.size

		return result
	}

	forward.forEach = (
		callbackfn: (
			value: Action<params>,
			value2: Action<params>,
			set: Set<Action<params>>
		) => void,
		thisArg?: unknown
	) => set.forEach(callbackfn, thisArg)

	forward.has = (value: Action<params>) => set.has(value)

	forward.size = set.size

	return forward
} as unknown as new <params extends any[] = []>(
	...initial: params
) => Forward<params>
