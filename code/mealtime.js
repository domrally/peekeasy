import { compose } from './compose.js';
import { handleContext } from './context.js';
import { State } from './state.js';
import { mapTransitions } from './transitions.js';
// 
export { State, mealtime, compose };
// 
const mealtime = (initialState, transitions) => {
    const transitionMap = mapTransitions(transitions);
    const handler = handleContext(initialState, transitionMap);
    return new Proxy(initialState, handler);
};
// 
if (typeof window !== 'undefined') {
    (window['mealtimeVersions'] || (window['mealtimeVersions'] = [])).push('0.0.9');
}
