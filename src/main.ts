import { Context } from './context.js'
import { State } from './state.js'
import { Transitions } from './transitions.js'
// 
export { State }
// 
export const CreateStateProxy = <S extends object & State<S, T>, T extends number | string>(initialState: S, transitions: { [index: number]: [S, S][] }): S & AsyncIterable<S> => {
	const transitionMap = new Transitions<S, T>(transitions)
	const { target, handler } = new Context<S, T>(initialState, transitionMap)
	return new Proxy<S & AsyncIterable<S>>(target, handler)
}