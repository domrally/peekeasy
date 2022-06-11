import type { Action, Delegate } from './exports'
import { error } from 'console'

/**
 * A weak set of event listeners
 */
export type Event<params extends any[]> = WeakSet<Action<params>>
/**
 * Constructor function
 * @param delegate callable parent delegate
 */
export const Event = function <params extends any[]>(
	delegate: Delegate<params>
) {
	const apply = () => error('an event can only be called through its delegate')

	const get = (target: any, key: PropertyKey) => {
		if (key in weakSet || !(key in set)) return target[key]

		error('an event does not have properties from Set that are not in WeakSet')
	}

	return new Proxy(delegate, {
		apply,
		get,
	})
} as unknown as new <params extends any[]>(
	delegate: Delegate<params>
) => Event<params>

const set = new Set(),
	weakSet = new WeakSet()
