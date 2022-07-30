import { Action, Forward } from './exports'

/**
 * A weak set of event listeners
 */
export class Delegate<params extends any[] = []>
	implements
		WeakSet<Action<params>>,
		AsyncIterable<params>,
		PromiseLike<params>
{
	constructor(
		protected forward: Forward<params> = new Forward(),
		...forwards: Forward<params>[]
	) {
		forwards ??= []
		forwards.push(forward)
		this.#forwards = [...new Set(forwards)]
	}

	//
	[Symbol.toStringTag] = this.toString()

	add(value: Action<params>) {
		this.#forwards.forEach(d => d?.add?.(value))

		return this
	}

	delete(value: Action<params>) {
		this.#forwards.forEach(d => d?.delete?.(value))

		return true
	}

	has(value: Action<params>) {
		return this.#forwards.some(d => d?.has?.(value))
	}

	#forwards!: Forward<params>[]

	//
	async *[Symbol.asyncIterator]() {
		while (true) {
			yield new Promise<params>(resolve => {
				const resolution = (...args: params) => {
					resolve(args)

					this.#forwards.forEach(d => d?.delete?.(resolution))
				}

				this.#forwards.forEach(d => d?.add?.(resolution))
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
