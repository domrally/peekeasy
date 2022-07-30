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
	constructor(
		protected delegate: Delegate<params> = new Delegate(),
		...delegates: Delegate<params>[]
	) {
		delegates ??= []
		delegates.push(delegate)
		this.#delegates = [...new Set(delegates)]
	}

	//
	[Symbol.toStringTag] = this.toString()

	add(value: Action<params>) {
		this.#delegates.forEach(d => d?.add?.(value))

		return this
	}

	delete(value: Action<params>) {
		this.#delegates.forEach(d => d?.delete?.(value))

		return true
	}

	has(value: Action<params>) {
		return this.#delegates.some(d => d?.has?.(value))
	}

	#delegates!: Delegate<params>[]

	//
	async *[Symbol.asyncIterator]() {
		while (true) {
			yield new Promise<params>(resolve => {
				const resolution = (...args: params) => {
					resolve(args)

					this.#delegates.forEach(d => d?.delete?.(resolution))
				}

				this.#delegates.forEach(d => d?.add?.(resolution))
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
