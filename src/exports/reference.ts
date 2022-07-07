/**
 * current state of the Iterator
 */
export type Reference<T> = T
/**
 * Constructor function
 * @param states permitted states of the state pattern
 */
export const Reference = function <T>(states: Iterable<T>) {
	let next: any

	for (const value of states) {
		;(value as any).add?.(() => (next = () => ({ value })))

		next ??= () => ({ value })
	}

	const handler = {
		apply(_: any, thisArg: unknown, args: unknown[]) {
			return next().value.apply(thisArg, args)
		},
		get(_: T, key: PropertyKey) {
			return next().value[key]
		},
		set(_: T, key: PropertyKey, value: unknown) {
			next().value[key] = value

			return true
		},
	}

	return new Proxy(() => {}, handler)
} as unknown as new <T>(states: Iterable<T>) => Reference<T>
