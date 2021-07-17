import { handleContext } from './context.js';
import { mapTransitions } from './transitions.js';
// 
export const proxy = (initialState, transitions) => {
    const transitionMap = mapTransitions(transitions);
    const handler = handleContext(initialState, transitionMap);
    return new Proxy(initialState, handler);
};
