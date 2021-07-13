import { createContext } from './src/context.js'
import { composeState, Machineable, State } from './src/state.js'
import { createTransitions } from './src/transitions.js'
import { createTriggers } from './src/triggers.js'
// 
const createProxy = <S, T extends symbol>(initialState: S & Machineable & AsyncIterable<T>, transitions: Record<T, [S & Machineable & AsyncIterable<T>, S & Machineable & AsyncIterable<T>][]>) => {
	const transitionMap = createTransitions(transitions)
	const handler = createContext(initialState, transitionMap)
	return new Proxy(initialState as S & AsyncIterable<T>, handler)
}
// 
export { Machineable, State, createProxy, composeState as createState, createTriggers, createTransitions }
