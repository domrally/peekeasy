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
var _Context_handler, _Context_proxy, _Context_state;
export class Context {
    constructor() {
        _Context_handler.set(this, {
            get: (_, key) => __classPrivateFieldGet(this, _Context_state, "f")[key],
            set: (_, key, value) => __classPrivateFieldGet(this, _Context_state, "f")[key] = value,
        });
        _Context_proxy.set(this, new Proxy({}, __classPrivateFieldGet(this, _Context_handler, "f")));
        _Context_state.set(this, {});
    }
    get state() {
        return __classPrivateFieldGet(this, _Context_proxy, "f");
    }
    set state(s) {
        __classPrivateFieldSet(this, _Context_state, s, "f");
    }
}
_Context_handler = new WeakMap(), _Context_proxy = new WeakMap(), _Context_state = new WeakMap();
