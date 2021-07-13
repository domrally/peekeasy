import { createContext } from './src/context.js';
import { composeState, State } from './src/state.js';
import { createTransitions } from './src/transitions.js';
// 
const createProxy = (initialState, transitions) => {
    const transitionMap = createTransitions(transitions);
    const handler = createContext(initialState, transitionMap);
    return new Proxy(initialState, handler);
};
// 
export { State, createProxy, composeState as createState, createTransitions };
