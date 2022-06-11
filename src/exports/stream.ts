import type { Action, Delegate } from './exports'

export type Stream<params> = AsyncIterable<params> & PromiseLike<params>
/**
 * a wrapped delegate that can't be called directly
 */
/**
 * @param delegate callable parent delegate
 */
export const Stream = function <params extends any[]>(
	delegate: Delegate<params>
) {
	const asyncIterator = async function* () {
		while (true) {
			yield new Promise<params>(resolve => {
				const resolution = ((...args: params) =>
					resolve(args)) as Action<params>

				delegate.add(resolution)
			})
		}
	}

	const then = async <U = params, V = never>(
		onfulfilled: (args: params) => PromiseLike<U>,
		onrejected: (reason: any) => PromiseLike<V>
	) => {
		try {
			const next = await asyncIterator().next(),
				result = next.value as params

			return onfulfilled?.(result)
		} catch (error) {
			return onrejected?.(error)
		}
	}

	return {
		then,
		[Symbol.asyncIterator]: asyncIterator,
	}
} as unknown as new <params extends any[]>(
	delegate: Delegate<params>
) => Stream<params>
