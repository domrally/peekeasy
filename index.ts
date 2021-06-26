import { Context } from './src/context.js'
import { State } from './src/state.js'
export { State }
// 
export const Mealy = <S extends AsyncIterable<[S, T]> & State<S, T>, T>(...states: S[]): S => {
	const { target, handler } = new Context<S, T>(states)
	return new Proxy(target, handler)
}