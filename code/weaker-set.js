var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _WeakerSet_weak;
export class WeakerSet {
    constructor(weak) {
        _WeakerSet_weak.set(this, void 0);
        __classPrivateFieldSet(this, _WeakerSet_weak, weak, "f");
    }
    has(t) {
        return __classPrivateFieldGet(this, _WeakerSet_weak, "f").has(t);
    }
    add(t) {
        return __classPrivateFieldGet(this, _WeakerSet_weak, "f").add(t);
    }
    delete(t) {
        return __classPrivateFieldGet(this, _WeakerSet_weak, "f").delete(t);
    }
    get [(_WeakerSet_weak = new WeakMap(), Symbol.toStringTag)]() {
        return __classPrivateFieldGet(this, _WeakerSet_weak, "f")[Symbol.toStringTag];
    }
}
