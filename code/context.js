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
var _Context_instances, _Context_get, _Context_set, _Context_handler, _Context_proxy, _Context_target, _Context_next, _Context_publish, _Context_subscribe;
export class Context {
    constructor() {
        _Context_instances.add(this);
        _Context_handler.set(this, {
            get: (_, key) => __classPrivateFieldGet(this, _Context_instances, "m", _Context_get).call(this, key),
            set: (_, key, value) => __classPrivateFieldGet(this, _Context_instances, "m", _Context_set).call(this, key, value),
        });
        _Context_proxy.set(this, new Proxy({}, __classPrivateFieldGet(this, _Context_handler, "f")));
        _Context_target.set(this, void 0);
        _Context_next.set(this, void 0);
        _Context_publish.set(this, (_property) => { });
    }
    get target() {
        return __classPrivateFieldGet(this, _Context_proxy, "f");
    }
    set target(target) {
        __classPrivateFieldSet(this, _Context_target, target, "f");
    }
    async *[(_Context_handler = new WeakMap(), _Context_proxy = new WeakMap(), _Context_target = new WeakMap(), _Context_next = new WeakMap(), _Context_publish = new WeakMap(), _Context_instances = new WeakSet(), Symbol.asyncIterator)]() {
        var _a;
        while (true) {
            yield await (__classPrivateFieldSet(this, _Context_next, (_a = __classPrivateFieldGet(this, _Context_next, "f")) !== null && _a !== void 0 ? _a : __classPrivateFieldGet(this, _Context_instances, "m", _Context_subscribe).call(this), "f"));
            __classPrivateFieldSet(this, _Context_next, undefined, "f");
        }
    }
}
_Context_get = function _Context_get(key) {
    return __classPrivateFieldGet(this, _Context_target, "f")[key];
}, _Context_set = function _Context_set(key, value) {
    __classPrivateFieldGet(this, _Context_target, "f")[key] = value;
    __classPrivateFieldGet(this, _Context_publish, "f").call(this, { key, value });
    return true;
}, _Context_subscribe = function _Context_subscribe() {
    return new Promise((p) => __classPrivateFieldSet(this, _Context_publish, p, "f"));
};
