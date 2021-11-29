export class DelegationHandler {
    constructor(delegate) {
        this.delegate = delegate;
    }
    get(_, key) {
        return this.delegate[key];
    }
    set(_, key, value) {
        this.delegate[key] = value;
        return true;
    }
    apply(_, that, args) {
        const bound = this.delegate.bind(that);
        return bound(...args);
    }
}
