var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _asyncIterable, _lazyInit;
import { Moore } from './moore.js';
//
export class Mealy {
    // 
    constructor(currentState, ...states) {
        this.currentState = currentState;
        this.handler = {
            get: (_, property) => {
                const proxied = property === Symbol.asyncIterator
                    ? __classPrivateFieldGet(this, _asyncIterable)[Symbol.asyncIterator]
                    : this.currentState[property];
                return proxied;
            },
            set: (_, property, value) => this.currentState[property] = value
        };
        _asyncIterable.set(this, void 0);
        _lazyInit.set(this, async () => {
            __classPrivateFieldSet(this, _lazyInit, null
            // 
            );
            // 
            for await (this.currentState of __classPrivateFieldGet(this, _asyncIterable)) { }
        });
        __classPrivateFieldSet(this, _asyncIterable, new Moore([currentState, ...states]));
    }
    get target() {
        __classPrivateFieldGet(this, _lazyInit)?.call(this);
        return this.currentState;
    }
}
_asyncIterable = new WeakMap(), _lazyInit = new WeakMap();
