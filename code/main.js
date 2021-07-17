import { createHandler } from './context.js';
import { composeState, createState, State } from './state.js';
import { createTransitions } from './transitions.js';
// 
if (typeof window !== 'undefined') {
    (window['mealtimeVersions'] || (window['mealtimeVersions'] = [])).push('0.0.9');
}
// 
const createProxy = (initialState, transitions) => {
    const transitionMap = createTransitions(transitions);
    const handler = createHandler(initialState, transitionMap);
    return new Proxy(initialState, handler);
};
// 
export { createState, createProxy, composeState, createTransitions, State };
