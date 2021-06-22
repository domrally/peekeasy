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
var _promise, _setState;
// 
export class State {
    // 
    constructor() {
        // 
        _promise.set(this, void 0);
        _setState.set(this, void 0);
        __classPrivateFieldSet(this, _setState, () => { });
        __classPrivateFieldSet(this, _promise, new Promise(resolve => __classPrivateFieldSet(this, _setState, resolve)));
    }
    // 
    async *[(_promise = new WeakMap(), _setState = new WeakMap(), Symbol.asyncIterator)]() {
        while (true) {
            yield await __classPrivateFieldGet(this, _promise);
        }
    }
    // 
    get setState() {
        const setState = __classPrivateFieldGet(this, _setState);
        __classPrivateFieldSet(this, _promise, new Promise(resolve => __classPrivateFieldSet(this, _setState, resolve)));
        return setState;
    }
}
