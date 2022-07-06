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
			const values = new Set()

			for (const scalar of scalars) {
				const v = scalar?.apply?.(thisArg, args)

				values.add(v)
			}

			return new Vector({ [Symbol.iterator]: values[Symbol.iterator] })
		},

		get(_, key) {
			if (key === Symbol.iterator) return scalars[Symbol.iterator]

			return new Vector({
				[Symbol.iterator]: function* () {
					for (const scalar of scalars) {
						yield scalar[key]
					}
				},
			})
		},

		set(_, key, value) {
			for (const scalar of scalars) {
				scalar[key] = value
			}

			return true
		},
	})
} as unknown as new <T>(...scalars: T[]) => Vector<T>
