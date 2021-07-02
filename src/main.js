import { Context } from './context.js';
import { State } from './state.js';
import { TransitionMap } from './transitions.js';
// 
export { State };
// 
export const CreateStateProxy = (initialState, transitions) => {
    const transitionMap = new TransitionMap(transitions);
    const { target, handler } = new Context(initialState, transitionMap);
    return new Proxy(target, handler);
};
