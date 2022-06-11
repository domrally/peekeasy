/**
 * Similar to a vectorized object from array programming
 * @returns values to iterate over
 */
export type Vector<T> = (() => IterableIterator<T>) & {
	[K in keyof T]: Vector<T[K]>
}
/**
 * Constructor function
 * @param context manager of the state pattern
 */
export const Vector = function (context: any) {
	const apply = () => context

	const get = (_: any, key: PropertyKey) => {
		return new Vector({
			next: () => ({ value: context.next().value[key] }),
			[Symbol.iterator]: function* () {
				for (const state of context) {
					yield state[key]
				}
			},
		})
	}

	const set = (_: any, key: any, value: any) => {
		for (const state of context) {
			state[key] = value
		}

		return true
	}

	return new Proxy(() => {}, {
		apply,
		get,
		set,
	})
} as unknown as new <T>(context: IterableIterator<T>) => Vector<T>
