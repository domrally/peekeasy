export type Transitions<S> = { [key: number]: [S, S][] }
export class TransitionMap<S, T extends number> extends Map<T, Map<S, S>> {
	constructor(triggers: Transitions<S>) {
		super()
		for (const key in triggers) {
			const map = new Map<S, S>()
			for (const tuple of triggers[key]) {
				this.set(Number.parseInt(key) as T, map.set(...tuple))
			}
		}
	}
}