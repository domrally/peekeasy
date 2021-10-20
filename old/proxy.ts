import { handleContext } from './context.js'
import { Custom } from './custom.js'
import { Eventable, Events } from './events.js'
import { mapTransitions } from './transitions.js'
// 
export const proxy = <S, T extends Eventable>(initialState: S & Custom & AsyncIterable<Events<T>>, transitions: Record<Events<T>, [S & Custom & AsyncIterable<Events<T>>, S & Custom & AsyncIterable<Events<T>>][]>) => {
	const transitionMap = mapTransitions(transitions)
	const handler = handleContext(initialState, transitionMap)
	return new Proxy(initialState as S & AsyncIterable<Events<T>>, handler)
}
