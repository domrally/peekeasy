import { createHandler } from './context.js'
import { composeState, createState, Machineable, State } from './state.js'
import { createTransitions } from './transitions.js'
import { createTriggers } from './triggers.js'
// 
if (typeof window !== 'undefined') {
	((window as any)['mealtimeVersions'] || ((window as any)['mealtimeVersions'] = [])).push('0.0.9')
}
// 
const createProxy = <S, T extends symbol>(initialState: S & Machineable & AsyncIterable<T>, transitions: Record<T, [S & Machineable & AsyncIterable<T>, S & Machineable & AsyncIterable<T>][]>) => {
	const transitionMap = createTransitions(transitions)
	const handler = createHandler(initialState, transitionMap)
	return new Proxy(initialState as S & AsyncIterable<T>, handler)
}
// 
export { Machineable, createState, createProxy, composeState, createTriggers, createTransitions, State }
