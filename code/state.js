var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var ___instances, ___trigger, ___promise, ___newPromise_get;
export const State = () => {
    return new _();
};
class _ {
    constructor() {
        ___instances.add(this);
        ___trigger.set(this, (_trigger) => { });
        // 
        ___promise.set(this, __classPrivateFieldGet(this, ___instances, "a", ___newPromise_get)
        // 
        );
    }
    get trigger() { return __classPrivateFieldGet(this, ___trigger, "f"); }
    // 
    async *[(___trigger = new WeakMap(), ___promise = new WeakMap(), ___instances = new WeakSet(), Symbol.asyncIterator)]() {
        while (true) {
            yield await __classPrivateFieldGet(this, ___promise, "f");
        }
    }
}
___newPromise_get = function ___newPromise_get() {
    return new Promise(resolve => __classPrivateFieldSet(this, ___trigger, (trigger) => {
        __classPrivateFieldSet(this, ___promise, __classPrivateFieldGet(this, ___instances, "a", ___newPromise_get), "f");
        resolve(trigger);
    }, "f"));
};
