import { error } from 'console'

/**
 * ### Description
 *
 * Similar to a vectorized object from array programming
 *
 * _example:_
 *
 * ```ts
 * import { Vector } from 'peekeasy'
 *
 * const { log } = console,
 * 	data = [['Hello, '], ['world!']],
 * 	vector = new Vector(...data)
 *
 * // Hello, world!
 * log(...vector[0])
 * ```
 *
 */
export type Vector<T> = T extends (...args: any) => any
	? Iterable<T> & ((...params: Parameters<T>) => Vector<ReturnType<T>>)
	: Iterable<T> & { [K in keyof T]: Vector<T[K]> }
/**
 * #### constructor
 *
 * @param scalars values of the vectorized element
 *
 */
export const Vector = function (...scalars: any[]) {
	return new Proxy(() => {}, {
		apply(_, thisArg, args) {
			try {
				const applied = scalars?.map(scalar => scalar?.apply?.(thisArg, args))

				return new Vector(...applied)
			} catch (message) {
				error(`Problem applying Vectorized function:\n${message}`)
			}
		},

		get(_, key) {
			try {
				if (symbols.includes(key as symbol)) {
					return () => scalars?.[Symbol.iterator]()
				} else {
					const keyed = scalars?.map(scalar => {
						let value = scalar?.[key]

						if (typeof value === 'function') {
							value = value.bind?.(scalar)
						}

						return value
					})

					return new Vector(...keyed)
				}
			} catch (message) {
				error(
					`Problem getting property "${
						key as string
					}" on Vectorized object:\n${message}`
				)
			}
		},

		set(_, key, value) {
			try {
				scalars?.forEach(scalar => (scalar[key] = value))

				return true
			} catch (message) {
				error(
					`Problem setting property "${
						key as string
					}" to "${value}" on Vectorized object:\n${message}`
				)

				return false
			}
		},
	})
} as unknown as new <T>(...scalars: T[]) => Vector<T>

const symbols = [Symbol.iterator, Symbol.toStringTag, Symbol.asyncIterator]
