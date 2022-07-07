/**
 * current state of the Iterator
 */
export type Reference<T> = T
/**
 * Constructor function
 * @param states permitted states of the state pattern
 */
export const Reference = function (...states: any[]) {
	let [state] = states

	for (const value of states) {
		value.add?.(() => (state = value))
	}

	return new Proxy(() => {}, {
		apply(_, thisArg, args) {
			return state.apply(thisArg, args)
		},
		get(_, key) {
			return state[key]
		},
		set(_, key, value) {
			state[key] = value

			return true
		},
	})
} as unknown as new <T>(...states: T[]) => Reference<T>
