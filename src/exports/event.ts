import { Action, Delegate } from './exports'

/**
 * A weak set of event listeners
 */
export class Event<params extends any[] = []>
	implements
		WeakSet<Action<params>>,
		AsyncIterable<params>,
		PromiseLike<params>
{
	constructor(protected delegate: Delegate<params> = new Delegate()) {}

	//
	[Symbol.toStringTag] = this.toString()
	add: (value: Action<params>) => this = this.delegate.add as any
	delete = this.delegate.delete
	has = this.delegate.has

	//
	async *[Symbol.asyncIterator]() {
		while (true) {
			yield new Promise<params>(resolve => {
				const resolution = (...args: params) => resolve(args)

				this.delegate.add(resolution)
			})
		}
	}

	//
	async then<U = params, V = never>(
		onfulfilled: (args: params) => PromiseLike<U>,
		onrejected: (reason: unknown) => PromiseLike<V>
	) {
		try {
			const iterator = this[Symbol.asyncIterator](),
				{ value } = await iterator.next()

			return onfulfilled?.(value as params)
		} catch (error) {
			return onrejected?.(error)
		}
	}
}
