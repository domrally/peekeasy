import type { Delegate } from './delegate'

export interface Event<params extends any[]>
	extends WeakSet<(...args: any[]) => void>,
		AsyncIterable<params>,
		PromiseLike<params> {}
/**
 * a wrapped delegate that can't be called directly
 */
export class Event<params extends any[]> {
	/**
	 * @param delegate callable parent delegate
	 */
	constructor(delegate: Delegate<params>) {
		return new Proxy(delegate, {
			apply: () => {
				throw new Error()
			},
		})
	}
}
