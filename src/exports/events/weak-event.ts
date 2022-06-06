import type { Event } from './event'

export interface WeakEvent<params extends any[]>
	extends WeakSet<(...args: any[]) => void>,
		AsyncIterable<params>,
		PromiseLike<params> {}
/**
 * Creates and manages a state pattern based on an initial set of possible states
 * @param initial state of the returned object
 * @param states array of states that can be activated
 * @returns a state without the extended event interface
 */
export class WeakEvent<params extends any[]> {
	constructor(event: Event<params>) {
		return new Proxy(event, {
			apply: () => {
				throw new Error()
			},
		})
	}
}
