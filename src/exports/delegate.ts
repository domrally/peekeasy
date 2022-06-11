import { Action } from './exports'

/**
 * A function that sends a message to all set members
 * @param args tuple of data that is passed to the listeners
 */
export type Delegate<params extends any[]> = Action<params> &
	Set<Action<params>>
/**
 * Delegate constructor
 * @param initial optional data that can be passed to the listeners immediately
 */
export const Delegate = function <params extends any[]>(initial?: params) {
	const set: any = new Set<Action<params>>(),
		delegate: any = (...args: params) => {
			new Set<Action<params>>(set).forEach(action => action(...args))
		}

	delegate.add = (value: Action<params>) => {
		const result = set.add(value)

		delegate.size = set.size

		if (initial) value(...initial)

		return result
	}

	delegate.clear = () => {
		const result = set.clear()

		delegate.size = set.size

		return result
	}

	delegate.delete = (value: Action<params>) => {
		const result = set.delete(value)

		delegate.size = set.size

		return result
	}

	delegate.forEach = (
		callbackfn: (
			value: Action<params>,
			value2: Action<params>,
			set: Set<Action<params>>
		) => void,
		thisArg?: any
	) => set.forEach(callbackfn, thisArg)

	delegate.has = (value: Action<params>) => set.has(value)

	delegate.size = set.size

	return delegate
} as unknown as new <params extends any[]>(initial?: params) => Delegate<params>
