"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Caller_instances, _Caller_callBacksAsync;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Caller = void 0;
const peek_set_js_1 = require("./peek-set.js");
class Caller extends Set {
    constructor() {
        super(...arguments);
        _Caller_instances.add(this);
        this.callBacks = new peek_set_js_1.PeekSet(this);
        this.call = (...parameters) => {
            const copy = new Set(this);
            this.clear();
            copy.forEach(resolve => resolve(parameters));
        };
    }
    get callBacksAsync() {
        return __classPrivateFieldGet(this, _Caller_instances, "m", _Caller_callBacksAsync).call(this);
    }
}
exports.Caller = Caller;
_Caller_instances = new WeakSet(), _Caller_callBacksAsync = function* _Caller_callBacksAsync() {
    while (true) {
        yield new Promise(resolve => this.add(resolve));
    }
};
//# sourceMappingURL=caller.js.map