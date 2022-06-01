import type { State } from './state'

export function WeakState<T>(state: State<T>): T {
	return new Proxy(state, {
		apply: () => {
			throw new Error()
		},
	})
}
export default WeakState
