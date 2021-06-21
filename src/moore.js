var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _asyncIterator, _setResult, _getAsyncIterator, _lazyInit;
//
export class Moore {
    // 
    constructor(states) {
        this.states = states;
        _asyncIterator.set(this, void 0);
        _setResult.set(this, () => { });
        _getAsyncIterator.set(this, () => {
            const promise = new Promise(resolve => __classPrivateFieldSet(this, _setResult, resolve));
            const getPromise = () => promise;
            const asyncIterator = { next: getPromise };
            const getAsyncIterator = () => asyncIterator;
            return getAsyncIterator;
        });
        _lazyInit.set(this, async () => {
            __classPrivateFieldSet(this, _lazyInit, null);
            const getNextValue = () => {
                __classPrivateFieldSet(this, _asyncIterator, __classPrivateFieldGet(this, _getAsyncIterator).call(this));
                const asyncIterable = this.states.map(s => s.promise);
                return Promise.race(asyncIterable);
            };
            while (true) {
                const value = await getNextValue();
                __classPrivateFieldGet(this, _setResult)?.call(this, { value, done: false });
            }
        });
        __classPrivateFieldSet(this, _asyncIterator, __classPrivateFieldGet(this, _getAsyncIterator).call(this));
    }
    get [(_asyncIterator = new WeakMap(), _setResult = new WeakMap(), _getAsyncIterator = new WeakMap(), _lazyInit = new WeakMap(), Symbol.asyncIterator)]() {
        __classPrivateFieldGet(this, _lazyInit)?.call(this);
        return __classPrivateFieldGet(this, _asyncIterator);
    }
}
