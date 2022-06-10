export type State<T> = T
export const State = function <T>(context: IterableIterator<T>) {
	function apply(_: T, thisArg: any, args: any[]) {
		return context.next().value.apply(thisArg, args)
	}

	function get(_: T, key: PropertyKey) {
		return context.next().value[key]
	}

	function set(_: T, key: PropertyKey, value: T[any]) {
		context.next().value[key] = value

		return true
	}

	return new Proxy<any>(() => {}, {
		apply,
		get,
		set,
	})
} as unknown as new <T>(context: Iterator<T>) => State<T>
