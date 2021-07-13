import { createContext } from './src/context.js';
import { composeState, State } from './src/state.js';
import { createTransitions } from './src/transitions.js';
// 
if (typeof window !== 'undefined') {
    (window['mealtimeVersions'] || (window['mealtimeVersions'] = [])).push('0.0.9');
}
// 
const createProxy = (initialState, transitions) => {
    const transitionMap = createTransitions(transitions);
    const handler = createContext(initialState, transitionMap);
    return new Proxy(initialState, handler);
};
// 
export { State, createProxy, composeState as createState, createTransitions };
