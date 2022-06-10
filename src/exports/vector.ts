export type Vector<T> = (() => IterableIterator<T>) & {
	[K in keyof T]: Vector<T[K]>
}
export const Vector = function <T>(context: IterableIterator<T>) {
	const apply = () => context

	function get(_: any, key: PropertyKey) {
		const child: any = []

		for (const state of context) {
			const value = (state as any)[key]

			child.push(value)
		}

		child.next = () => ({ value: context.next().value[key] })

		return new Vector(child)
	}

	function set(_: any, key: PropertyKey, value: T[any]) {
		for (const state of context) {
			;(state as any)[key] = value
		}

		return true
	}

	return new Proxy(() => {}, {
		apply,
		get,
		set,
	})
} as unknown as new <T>(context: IterableIterator<T>) => Vector<T>
