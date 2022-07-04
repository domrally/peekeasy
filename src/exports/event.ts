import type { Action, Delegate } from './exports'
import { error } from 'console'

/**
 * A weak set of event listeners
 */
export type Event<params extends any[]> = WeakSet<Action<params>> &
	AsyncIterable<params> &
	PromiseLike<params>
/**
 * Constructor function
 * @param delegate callable parent delegate
 */
export const Event = function <params extends any[]>(
	delegate: Delegate<params>
) {
	const event: any = (..._: any[]) =>
		error('an event can only be called through its delegate')
	event.delete = delegate.delete
	event.add = delegate.add
	event.has = delegate.has

	event[Symbol.asyncIterator] = async function* () {
		while (true) {
			yield new Promise<params>(resolve => {
				const resolution = ((...args: params) =>
					resolve(args)) as Action<params>

				delegate.add(resolution)
			})
		}
	}

	event.then = async <U = params, V = never>(
		onfulfilled: (args: params) => PromiseLike<U>,
		onrejected: (reason: any) => PromiseLike<V>
	) => {
		try {
			const next = await event[Symbol.asyncIterator]().next(),
				result = next.value as params

			return onfulfilled?.(result)
		} catch (error) {
			return onrejected?.(error)
		}
	}

	return event
} as unknown as new <params extends any[]>(
	delegate: Delegate<params>
) => Event<params>
