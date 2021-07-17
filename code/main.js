export { compose } from './compose.js';
export { proxy } from './proxy.js';
export { State } from './state.js';
if (typeof window !== 'undefined') {
    (window['mealtimeVersions'] || (window['mealtimeVersions'] = [])).push('0.0.9');
}
