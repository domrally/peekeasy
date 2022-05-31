import type { Event } from './event'

export interface WeakEvent<params extends any[]>
	extends WeakSet<(...args: any[]) => void>,
		AsyncIterable<params>,
		PromiseLike<params> {}

export class WeakEvent<params extends any[]> {
	constructor(event: Event<params>) {
		return new Proxy(event, {
			apply: () => {
				throw new Error()
			},
		})
	}
}
