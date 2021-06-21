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
var _target, _lazyInit;
import { Moore } from './moore.js';
//
export class Mealy {
    // 
    constructor(currentState, ...states) {
        this.currentState = currentState;
        _target.set(this, void 0);
        this.handler = {
            get: (_, property) => {
                __classPrivateFieldGet(this, _lazyInit)?.call(this);
                const proxy = property === Symbol.asyncIterator
                    ? this.moore[Symbol.asyncIterator]
                    : this.currentState[property];
                return proxy;
            },
            set: (_, property, value) => this.currentState[property] = value
        };
        _lazyInit.set(this, async () => {
            __classPrivateFieldSet(this, _lazyInit, null
            // 
            );
            // 
            for await (this.currentState of this.moore) {
                console.log(this.currentState);
            }
        });
        this.moore = new Moore([currentState, ...states]);
        __classPrivateFieldSet(this, _target, Object.assign(this.moore, currentState));
    }
    get target() {
        return __classPrivateFieldGet(this, _target);
    }
}
_target = new WeakMap(), _lazyInit = new WeakMap();
