import { DelegationHandler } from './delegation-handler.js';
export function Delegate(delegate) {
    const handler = new DelegationHandler(delegate);
    const proxy = new Proxy(delegate, handler);
    return function (d) {
        handler.delegate = d !== null && d !== void 0 ? d : delegate;
        return proxy;
    };
}
