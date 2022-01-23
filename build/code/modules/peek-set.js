"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeekSet = void 0;
class PeekSet {
    constructor(set) {
        this.set = set;
    }
    has(t) {
        return this.set.has(t);
    }
    add(t) {
        return this.set.add(t);
    }
    delete(t) {
        return this.set.delete(t);
    }
    get [Symbol.toStringTag]() {
        return this.set[Symbol.toStringTag];
    }
}
exports.PeekSet = PeekSet;
//# sourceMappingURL=peek-set.js.map