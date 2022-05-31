export const events = Object.freeze({
	onStart: Symbol('onStart'),
} as const)

type OptionsFlags<Type> = {
	[Property in keyof Type]: symbol
}

type CreateMutable<T> = {
	[Property in keyof T]: T[Property]
}

type d<T> = Map<T[keyof T], {}>
type c = d<typeof events>

type Optional<T> = {
	[K in keyof T]?: T[K]
}

export class Enum<T> implements Partial<T> {
	constructor(...keys: K) {
		const thing = {}
		for (const key of keys) {
			thing[key] = Symbol(key)
		}
		return Object.freeze(thing)
	}
}
export default { Enum }
