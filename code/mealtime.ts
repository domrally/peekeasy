import { compose } from './compose.js'
import { handleContext } from './context.js'
import { Custom } from './custom.js'
import { events } from './events.js'
import { State } from './state.js'
import { mapTransitions } from './transitions.js'
// 
export { State, mealtime, compose, events }
// 
const mealtime = <S, T extends symbol>(initialState: S & Custom & AsyncIterable<T>, transitions: Record<T, [S & Custom & AsyncIterable<T>, S & Custom & AsyncIterable<T>][]>) => {
	const transitionMap = mapTransitions(transitions)
	const handler = handleContext(initialState, transitionMap)
	return new Proxy(initialState as S & AsyncIterable<T>, handler)
}
// 
if (typeof window !== 'undefined') {
	((window as any)['mealtimeVersions'] || ((window as any)['mealtimeVersions'] = [])).push('0.0.9')
}
