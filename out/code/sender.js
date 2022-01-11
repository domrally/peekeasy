import { PeekSet } from './peek-set.js';
export class Sender extends Set {
    constructor() {
        super(...arguments);
        this.send = new Proxy(() => { }, this);
        this.sent = new PeekSet(this);
    }
    set(_, key, value) {
        const set = (t) => t[key] = value;
        this.forEach(set);
        return true;
    }
    apply(_, that, args) {
        const apply = (t) => t.apply(that, args);
        this.forEach(apply);
    }
}
