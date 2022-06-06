import type { Event } from './event'

export interface WeakEvent<params extends any[]>
	extends WeakSet<(...args: any[]) => void>,
		AsyncIterable<params>,
		PromiseLike<params> {}
/**
 * a wrapped event that can't be called directly
 */
export class WeakEvent<params extends any[]> {
	/**
	 * @param event callable parent event
	 */
	constructor(event: Event<params>) {
		return new Proxy(event, {
			apply: () => {
				throw new Error()
			},
		})
	}
}
