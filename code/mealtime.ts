import { compose } from './compose.js'
import { handleContext } from './context.js'
import { Custom } from './custom.js'
import { Eventable, Events } from './events.js'
import { State } from './state.js'
import { mapTransitions } from './transitions.js'
// 
export { compose, State, mealtime }
// 
const mealtime = <S, T extends Eventable>(initialState: S & Custom & AsyncIterable<Events<T>>, transitions: Record<Events<T>, [S & Custom & AsyncIterable<Events<T>>, S & Custom & AsyncIterable<Events<T>>][]>) => {
	const transitionMap = mapTransitions(transitions)
	const handler = handleContext(initialState, transitionMap)
	return new Proxy(initialState as S & AsyncIterable<Events<T>>, handler)
}
// 
if (typeof window !== 'undefined') {
	((window as any)['mealtimeVersions'] || ((window as any)['mealtimeVersions'] = [])).push('0.0.9')
}
