/**
 * ### Description
 *
 * Similar to a vectorized object from array programming
 *
 * _example:_
 *
 * ```ts
 *const vector = new Vector([
 *    { index: 1 },
 *    { index: 2 },
 *    { index: 3 }
 *])
 *
 *let index = 0
 *
 *for (const i of vector.index) {
 *	   const a = ++index === i
 *	   assert(a, `❌ indices ${i} & ${index} are not equal`)
 *}
 *```
 */
export type Vector<T> = { [K in keyof T]: Vector<T[K]> } & Iterable<T> &
	(<U extends T & ((...args: any[]) => any)>(
		...params: Parameters<U>
	) => Vector<ReturnType<U>>)
/**
 * Constructor function
 * @param scalars values of the vectorized element
 */
export const Vector = function (...scalars: any[]) {
	return new Proxy(() => {}, {
		apply(_, thisArg, args) {
			const applied = scalars?.map(scalar => scalar?.apply?.(thisArg, args))

			return new Vector(...applied)
		},

		get(_, key) {
			if (symbols.includes(key as symbol)) {
				return () => scalars?.[Symbol.iterator]()
			} else {
				const keyed = scalars?.map(scalar => scalar?.[key])

				return new Vector(...keyed)
			}
		},

		set(_, key, value) {
			scalars?.forEach(scalar => (scalar[key] = value))

			return true
		},
	})
} as unknown as new <T>(...scalars: T[]) => Vector<T>

const symbols = [Symbol.iterator, Symbol.toStringTag, Symbol.asyncIterator]
