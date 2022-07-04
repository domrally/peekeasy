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
export type Vector<T> = T &
	Iterable<T> & {
		[K in keyof T]: Vector<T[K]>
	} & (<U extends T & ((...args: any[]) => any)>(
		...args: any[]
	) => Vector<ReturnType<U>>)
/**
 * Constructor function
 * @param scalars values of the vectorized element
 */
export const Vector = function (scalars: Iterable<any>) {
	const apply = (_: any, thisArg: any, args: any[]) => {
		let values: any = new Set()

		for (const scalar of scalars) {
			const v = scalar.apply(thisArg, args)

			values.add(v)
		}

		return new Vector({
			[Symbol.iterator]: values[Symbol.iterator],
		})
	}

	const get = (_: any, key: PropertyKey) => {
		if (key === Symbol.iterator) return scalars[Symbol.iterator]

		return new Vector({
			[Symbol.iterator]: function* () {
				for (const scalar of scalars) {
					yield scalar[key]
				}
			},
		})
	}

	const set = (_: any, key: any, value: any) => {
		for (const scalar of scalars) {
			scalar[key] = value
		}

		return true
	}

	return new Proxy(() => {}, {
		apply,
		get,
		set,
	})
} as unknown as new <T>(scalars: Iterable<T>) => Vector<T>
