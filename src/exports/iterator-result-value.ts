/**
 * current state of the Iterator
 */
export type IteratorResultValue<T> = IteratorResult<T>['value']
/**
 * Constructor function
 * @param context manager of the state pattern
 */
export const IteratorResultValue = function <T>(context: Iterator<T>) {
	const apply = (_: any, thisArg: any, args: any[]) => {
		return context.next().value.apply(thisArg, args)
	}

	const get = (_: any, key: PropertyKey) => {
		return context.next().value[key]
	}

	const set = (_: any, key: PropertyKey, value: T[any]) => {
		context.next().value[key] = value

		return true
	}

	return new Proxy(() => {}, {
		apply,
		get,
		set,
	})
} as unknown as new <T>(context: Iterator<T>) => IteratorResultValue<T>
