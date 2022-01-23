"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proxier = void 0;
class Proxier {
    constructor(target) {
        this.get = (target, key) => { var _a, _b; return (_b = (_a = this.target) === null || _a === void 0 ? void 0 : _a[key]) !== null && _b !== void 0 ? _b : target[key]; };
        this.set = (target, key, value) => { var _a; return ((_a = this.target) === null || _a === void 0 ? void 0 : _a[key]) ? (this.target[key] = value) : (target[key] = value); };
        this.apply = (target, that, args) => { var _a; return ((_a = this.target) !== null && _a !== void 0 ? _a : target).apply(that, args); };
        this.target = target;
        this.proxy = new Proxy(target !== null && target !== void 0 ? target : (() => { }), this);
    }
    setProxy(target) {
        return (this.target = target);
    }
}
exports.Proxier = Proxier;
//# sourceMappingURL=proxier.js.map