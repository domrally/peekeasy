import { Event } from './exports'

export interface Vector<T extends Partial<Event<[]>>> extends Set<T> {
	(): Vectored<T>
}
/**
 * Creates and manages a state pattern based on a target set of possible states
 * @param target state of the returned object
 * @param states array of states that can be activated
 * @returns a state without the extended event interface
 */
export class Vector<T extends Partial<Event<[]>>> {
	constructor(start: number, state: T, ...states: T[]) {
		this.#index = start
		this.#states = [state, ...states]

		for (let i = 0; i < this.#states.length; i++) {
			this.#states[i].add?.(() => (this.#index = i))
		}

		const vector: any = (() => new Proxy(() => {}, this)).bind(this)

		vector[Symbol.iterator] = this.#states[Symbol.iterator].bind(this)
		vector.add = this.#states.push.bind(this)
		vector.clear = this.#states.splice.bind(this, 0, this.#states.length)
		vector.delete = (value: T) =>
			this.#states.splice.bind(this, this.#states.indexOf(value), 1)
		vector.forEach = this.#states.forEach.bind(this)
		vector.has = this.#states.includes.bind(this)

		return vector as unknown as this
	}

	#index = 0
	#states: T[]

	apply(_: any) {
		return new Proxy(() => {}, {
			apply: (_: any, thisArg, args) => {
				const values = this.#states.map((value: any) =>
					value.apply(thisArg, args)
				)

				return values[this.#index]
			},
			get: (_, key) => {
				const values = this.#states.map((state: any) => state[key])

				if (typeof values[this.#index] === 'function') {
					values[this.#index] = values[this.#index].bind(this)
				}

				return values[this.#index]
			},
			set: (_, key, value) => {
				const values = this.#states.map((state: any) => (state[key] = value))

				return values[this.#index]
			},
		})
	}

	get(_: any, property: PropertyKey) {
		const [v, ...values] = this.#states.map((t: any) => t[property])

		return new Vector(this.#index, v, ...values)()
	}

	set(_: any, property: PropertyKey, value: any) {
		const [v, ...values] = this.#states.map((t: any) => (t[property] = value))

		return new Vector(this.#index, v, ...values)() as any
	}
}

type Vectored<T> = (() => T) & {
	[K in keyof T]: Vectored<T[K]>
}
