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
var _setState;
// 
export class State {
    // 
    constructor() {
        _setState.set(this, void 0);
        __classPrivateFieldSet(this, _setState, () => { });
        this.promise = new Promise(resolve => __classPrivateFieldSet(this, _setState, resolve));
    }
    // 
    async *[(_setState = new WeakMap(), Symbol.asyncIterator)]() {
        while (true) {
            yield await this.promise;
        }
    }
    //
    get setState() {
        const setState = __classPrivateFieldGet(this, _setState);
        this.promise = new Promise(resolve => __classPrivateFieldSet(this, _setState, resolve));
        return setState;
    }
}
