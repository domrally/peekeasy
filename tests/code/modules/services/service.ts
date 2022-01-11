export function service<T>() {
	return class Service {
		static #instance: T
		static get instance() {
			return Service.#instance
		}
		constructor() {
			Service.#instance = this as any
		}
	}
}
