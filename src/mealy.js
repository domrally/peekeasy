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
var _lazyInit;
//
export class Mealy {
    // 
    constructor(currentState) {
        this.currentState = currentState;
        // 
        _lazyInit.set(this, async () => {
            __classPrivateFieldSet(this, _lazyInit, null);
            for await (this.currentState of this) { }
        });
    }
    // 
    async *[(_lazyInit = new WeakMap(), Symbol.asyncIterator)]() {
        while (true) {
            const next = await this.currentState[Symbol.asyncIterator]().next();
            this.currentState = next.value;
            yield this.currentState;
        }
    }
    // 
    get target() {
        __classPrivateFieldGet(this, _lazyInit)?.call(this);
        const target = Object.assign({}, this.currentState, this);
        return target;
    }
    // 
    get handler() {
        return {
            get: (_, property) => this.currentState[property],
            set: (_, property, value) => this.currentState[property] = value
        };
    }
}
