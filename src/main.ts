import { Context } from './context.js'
import { State } from './state.js'
// 
export { State }
// 
export const CreateStateProxy = <S extends object & State<S, T>, T>(initialState: S, transitions: Map<[S, T], S>): S & AsyncIterable<S> => {
	const { target, handler } = new Context<S, T>(initialState, transitions)
	return new Proxy<S & AsyncIterable<S>>(target, handler)
}
