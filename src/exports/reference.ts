/**
 * current state of the Iterator
 */
export type Reference<T> = T
/**
 * Constructor function
 * @param states permitted states of the state pattern
 */
export const Reference = function <T>(states: Iterable<T>) {
	const context = [...states] as any[] & Iterator<T>,
		[value] = context

	context.next = () => ({ value })

	for (const value of context) {
		value.add?.(() => (context.next = () => ({ value })))
	}

	const handler = {
		apply(_: any, thisArg: unknown, args: unknown[]) {
			return context.next().value.apply(thisArg, args)
		},
		get(_: T, key: PropertyKey) {
			return context.next().value[key]
		},
		set(_: T, key: PropertyKey, value: unknown) {
			context.next().value[key] = value

			return true
		},
	}

	return new Proxy(() => {}, handler)
} as unknown as new <T>(states: Iterable<T>) => Reference<T>
