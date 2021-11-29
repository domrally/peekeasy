import { DelegationHandler } from './delegation-handler.js';
export function Delegate(initial) {
    const handler = new DelegationHandler(initial);
    const proxy = new Proxy(initial !== null && initial !== void 0 ? initial : {}, handler);
    return function (delegate) {
        handler.delegate = delegate !== null && delegate !== void 0 ? delegate : initial;
        return proxy;
    };
}
