import { error } from 'console'
import { Action } from '../exports'

/**
 * ### Description
 *
 * Delegates actions to a weak set of listeners
 *
 * _example_
 *
 * ```ts
 * import { Action, Delegate } from 'peekeasy'
 *
 * const set = new Set<Action<[string, string]>>(),
 * 	delegate = new Delegate(set)
 *
 * delegate.then(async message => console.log(...message))
 *
 * // Hello, delegate!
 * set.forEach(f => f('Hello,', 'delegate!'))
 * ```
 *
 */
export class Delegate<T extends any[] = []>
	implements WeakSet<Action<T>>, AsyncIterable<T>, PromiseLike<T>
{
	/**
	 *
	 */
	private sets!: Set<Action<T>>[]

	/**
	 *
	 * @param sets event senders
	 *
	 */
	constructor(...sets: Set<Action<T>>[]) {
		try {
			sets ??= [new Set()]

			// deduplicate sets
			this.sets = [...new Set(sets)]
		} catch (message) {
			error(`Problem constructing Delegate:\n${message}`)
		}
	}

	add(listener: Action<T>) {
		try {
			this.sets.forEach(d => d?.add?.(listener))
		} catch (message) {
			error(`Problem adding listener to Delegate:\n${message}`)
		}

		return this
	}

	delete(listener: Action<T>) {
		try {
			this.sets.forEach(d => d?.delete?.(listener))
		} catch (message) {
			error(`Problem deleting listener from Delegate:\n${message}`)
		}

		return true
	}

	has(listener: Action<T>) {
		try {
			return this.sets.some(d => d?.has?.(listener))
		} catch (message) {
			error(`Problem checking if Delegate has listener:\n${message}`)

			return false
		}
	}

	async then<U = T, V = never>(
		onfulfilled?: (args: T) => PromiseLike<U>,
		onrejected?: (reason: unknown) => PromiseLike<V>
	): Promise<any> {
		try {
			const iterator = this[Symbol.asyncIterator](),
				{ value } = await iterator.next()

			return onfulfilled?.(value as T)
		} catch (message) {
			return onrejected?.(
				`Problem with callback function awaiting then on Delegate:\n${message}`
			)
		}
	}

	async *[Symbol.asyncIterator]() {
		while (true) {
			try {
				yield new Promise<T>(resolve => {
					const resolution = (...args: T) => {
						resolve(args)

						this.sets.forEach(d => d?.delete?.(resolution))
					}

					this.sets.forEach(d => d?.add?.(resolution))
				})
			} catch (message) {
				error(`Problem awaiting for Delegate:\n${message}`)
			}
		}
	}

	get [Symbol.toStringTag]() {
		try {
			return JSON.stringify(this)
		} catch (message) {
			error(`Problem converting Delegate to string:\n${message}`)

			return Delegate.name
		}
	}
}
