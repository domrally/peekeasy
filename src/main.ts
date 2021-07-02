import { Context } from './context.js'
import { State } from './state.js'
import { TransitionMap, Transitions } from './transitions.js'
// 
export { State }
// 
export const CreateStateProxy = <S extends object & State<S, T>, T extends number>(initialState: S, transitions: Transitions<S>): S & AsyncIterable<S> => {
	const transitionMap = new TransitionMap<S, T>(transitions)
	const { target, handler } = new Context<S, T>(initialState, transitionMap)
	return new Proxy<S & AsyncIterable<S>>(target, handler)
}
