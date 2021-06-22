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
var _setResult, _nextPromise, _asyncIterator, _lazyInit;
//
export class Moore {
    // 
    constructor(states) {
        this.states = states;
        _setResult.set(this, () => { });
        _nextPromise.set(this, new Promise(resolve => __classPrivateFieldSet(this, _setResult, resolve)));
        _asyncIterator.set(this, () => {
            return {
                next: () => __classPrivateFieldGet(this, _nextPromise)
            };
        });
        _lazyInit.set(this, async () => {
            __classPrivateFieldSet(this, _lazyInit, null);
            while (true) {
                const value = await Promise.race(this.states);
                const setResult = __classPrivateFieldGet(this, _setResult);
                __classPrivateFieldSet(this, _nextPromise, new Promise(resolve => __classPrivateFieldSet(this, _setResult, resolve)));
                setResult({ value, done: false });
            }
        });
    }
    get [(_setResult = new WeakMap(), _nextPromise = new WeakMap(), _asyncIterator = new WeakMap(), _lazyInit = new WeakMap(), Symbol.asyncIterator)]() {
        __classPrivateFieldGet(this, _lazyInit)?.call(this);
        return __classPrivateFieldGet(this, _asyncIterator);
    }
}
