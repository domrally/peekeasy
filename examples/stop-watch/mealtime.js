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
var _State_instances, _State_trigger, _State_promise, _State_newPromise_get;
export const composeState = window.composeState;
export const createProxy = window.createProxy;
export class State {
    constructor() {
        _State_instances.add(this);
        _State_trigger.set(this, (_trigger) => { });
        // 
        _State_promise.set(this, __classPrivateFieldGet(this, _State_instances, "a", _State_newPromise_get)
        // 
        );
    }
    get trigger() { return __classPrivateFieldGet(this, _State_trigger, "f"); }
    // 
    async *[(_State_trigger = new WeakMap(), _State_promise = new WeakMap(), _State_instances = new WeakSet(), Symbol.asyncIterator)]() {
        while (true) {
            yield await __classPrivateFieldGet(this, _State_promise, "f");
        }
    }
}
_State_newPromise_get = function _State_newPromise_get() {
    return new Promise(resolve => __classPrivateFieldSet(this, _State_trigger, (trigger) => {
        __classPrivateFieldSet(this, _State_promise, __classPrivateFieldGet(this, _State_instances, "a", _State_newPromise_get), "f");
        resolve(trigger);
    }, "f"));
};
