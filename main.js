import { Context } from './src/context.js';
import { State } from './src/state.js';
import { TransitionMap } from './src/transitions.js';
// 
export { State };
// 
export const CreateStateProxy = (initialState, transitions) => {
    const transitionMap = new TransitionMap(transitions);
    const { target, handler } = new Context(initialState, transitionMap);
    return new Proxy(target, handler);
};
