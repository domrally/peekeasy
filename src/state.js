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
var _transition;
export class State {
    // 
    constructor() {
        _transition.set(this, void 0);
        __classPrivateFieldSet(this, _transition, () => { });
        this.promise = this.newPromise;
    }
    // 
    async *[(_transition = new WeakMap(), Symbol.asyncIterator)]() {
        while (true) {
            yield await this.promise;
        }
    }
    get newPromise() {
        return new Promise(resolve => __classPrivateFieldSet(this, _transition, resolve));
    }
    // 
    trigger(trigger) {
        const transition = __classPrivateFieldGet(this, _transition);
        this.promise = this.newPromise;
        transition([this, trigger]);
    }
}
