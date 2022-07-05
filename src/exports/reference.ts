/**
 * current state of the Iterator
 */
export type Reference<T> = T
/**
 * Constructor function
 * @param states permitted states of the state pattern
 */
export const Reference = function <T>(states: Iterable<T>) {
	const values = [...states] as any[] & Iterator<T>,
		[value] = values

	values.next = () => ({ value })

	for (const value of values) {
		value.add?.(() => (values.next = () => ({ value })))
	}

	const handler = {
		apply(_: any, thisArg: unknown, args: unknown[]) {
			return values.next().value.apply(thisArg, args)
		},
		get(_: T, key: PropertyKey) {
			return values.next().value[key]
		},
		set(_: T, key: PropertyKey, value: unknown) {
			values.next().value[key] = value

			return true
		},
	}

	return new Proxy(() => {}, handler)
} as unknown as new <T>(states: Iterable<T>) => Reference<T>
