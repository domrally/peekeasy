import type { Action } from './exports'
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
export const Event = function <params extends any[]>(delegate: Event<params>) {
	const event = (() =>
		error(
			'an event can only be called through its delegate'
		)) as unknown as Event<params>

	event.delete = delegate.delete
	event.add = delegate.add
	event.has = delegate.has

	event[Symbol.asyncIterator] = async function* () {
		while (true) {
			yield new Promise<params>(resolve => {
				const resolution = (...args: params) => resolve(args)

				delegate.add(resolution)
			})
		}
	}

	event.then = async <U = params, V = never>(
		onfulfilled: (args: params) => PromiseLike<U>,
		onrejected: (reason: unknown) => PromiseLike<V>
	) => {
		try {
			const { next } = event[Symbol.asyncIterator](),
				{ value } = await next()

			return onfulfilled?.(value)
		} catch (error) {
			return onrejected?.(error)
		}
	}

	return event
} as unknown as new <params extends any[]>(
	delegate: Event<params>
) => Event<params>
