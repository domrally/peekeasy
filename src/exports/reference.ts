import { error } from 'console'

/**
 * ### Description
 *
 * Calls actions on a set of listeners
 *
 * _example_
 *
 * ```ts
 * import { Reference } from 'peekeasy'
 *
 * function* generate() {
 * 	while (true) {
 * 		yield 'Hello, reference!'
 * 	}
 * }
 *
 * const reference = new Reference(generate())
 *
 * // Hello, reference!
 * console.log(`${reference}`)
 * ```
 *
 */
export type Reference<T> = T
/**
 * #### constructor
 *
 * @param states permitted states of the state pattern
 *
 */
export const Reference = function <T>(iterator: Iterator<T>) {
	const state = () => iterator.next().value

	return new Proxy(() => {}, {
		apply(_, thisArg, args) {
			try {
				return state().apply(thisArg, args)
			} catch (message) {
				error(`Problem applying Reference to state function:\n${message}`)
			}
		},
		get(_, key) {
			try {
				if ([Symbol.toStringTag, 'toString'].includes(key)) {
					return () => {
						let json = JSON.stringify(state())

						if (json[0] === '"') {
							json = json.slice(1, -1)
						}

						return json
					}
				} else {
					const //
						s = state(),
						value = s[key]
					if (typeof value === 'function') {
						return value.bind(s)
					} else {
						return value
					}
				}
			} catch (message) {
				error(
					`Problem getting Reference to state property "${
						key as string
					}":\n\t\t${message}`
				)
			}
		},
		getPrototypeOf() {
			return Object.getPrototypeOf(state())
		},
		set(_, key, value) {
			try {
				state()[key] = value

				return true
			} catch (message) {
				error(
					`Problem setting state property "${
						key as string
					}" on Reference:\n${message}`
				)

				return false
			}
		},
	})
} as unknown as new <T>(iterator: Iterator<T>) => Reference<T>
