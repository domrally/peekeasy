"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proxier = void 0;
class Proxier {
    constructor(target) {
        this.target = target;
        this.get = (target, key) => { var _a; return (_a = this.target[key]) !== null && _a !== void 0 ? _a : target[key]; };
        this.set = (target, key, value) => this.target[key]
            ? (this.target[key] = value)
            : (target[key] = value);
        this.apply = (target, that, args) => { var _a; return ((_a = this.target) !== null && _a !== void 0 ? _a : target).apply(that, args); };
        this.proxy = new Proxy(target !== null && target !== void 0 ? target : (() => { }), this);
    }
    setProxy(target) {
        return (this.target = target);
    }
}
exports.Proxier = Proxier;
//# sourceMappingURL=proxier.js.map