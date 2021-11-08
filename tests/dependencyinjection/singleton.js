var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
export function Singleton(instance) {
    var _a, _instance;
    return _a = class {
            constructor() { }
            static get Instance() {
                return instance !== null && instance !== void 0 ? instance : __classPrivateFieldGet(this, _a, "f", _instance);
            }
        },
        _instance = { value: new _a() },
        _a;
}
