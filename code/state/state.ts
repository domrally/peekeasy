export function State<T>(initial: T): State<T> {
	const state: any = (s: T) => Object.assign(state, s)
	state(initial)
	return new Proxy(state, {})
}

export type State<T> = T & ((t: T) => void)
