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
var _Context_instances, _Context_proxy, _Context_target, _Context_next, _Context_publish, _Context_subscribe;
export class Context {
    constructor() {
        _Context_instances.add(this);
        _Context_proxy.set(this, void 0);
        _Context_target.set(this, void 0);
        _Context_next.set(this, void 0);
        _Context_publish.set(this, void 0);
    }
    get proxy() {
        var _a;
        return __classPrivateFieldSet(this, _Context_proxy, (_a = __classPrivateFieldGet(this, _Context_proxy, "f")) !== null && _a !== void 0 ? _a : new Proxy({}, this), "f");
    }
    setTarget(target) {
        __classPrivateFieldSet(this, _Context_target, target, "f");
    }
    async *observe() {
        var _a;
        while (true) {
            yield await (__classPrivateFieldSet(this, _Context_next, (_a = __classPrivateFieldGet(this, _Context_next, "f")) !== null && _a !== void 0 ? _a : __classPrivateFieldGet(this, _Context_instances, "m", _Context_subscribe).call(this), "f"));
            __classPrivateFieldSet(this, _Context_next, undefined, "f");
        }
    }
    get(_, key) {
        return __classPrivateFieldGet(this, _Context_target, "f")[key];
    }
    set(_, key, value) {
        var _a;
        __classPrivateFieldGet(this, _Context_target, "f")[key] = value;
        (_a = __classPrivateFieldGet(this, _Context_publish, "f")) === null || _a === void 0 ? void 0 : _a.call(this, [key, value]);
        return true;
    }
}
_Context_proxy = new WeakMap(), _Context_target = new WeakMap(), _Context_next = new WeakMap(), _Context_publish = new WeakMap(), _Context_instances = new WeakSet(), _Context_subscribe = function _Context_subscribe() {
    return new Promise((p) => __classPrivateFieldSet(this, _Context_publish, p, "f"));
};
