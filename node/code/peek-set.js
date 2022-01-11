export class PeekSet {
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
