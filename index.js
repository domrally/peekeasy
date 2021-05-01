export class Context {
    // start with the initial state returned by the factory
    constructor(factory, observers = []) {
        this.factory = factory;
        this.observers = observers;
        this._backCount = 0;
        this.mutator = {
            setState: (state) => this.concrete = state,
            resetState: () => this.concrete = this.factory(this.mutator),
            start: () => this.backCount = 1 - this.chain.length,
            back: () => this.backCount--,
            forward: () => this.backCount++,
            end: () => this.backCount = 0
        };
        this.handler = {
            get: (_target, prop) => this.concrete[prop],
            set: (_target, prop, value) => this.concrete[prop] = value
        };
        // tools for managing the state from outside the machine
        this.getStateProxy = () => this.proxy;
        this.chain = [factory(this.mutator)];
        this.proxy = new Proxy(this.concrete, this.handler);
    }
    get backCount() {
        return this._backCount;
    }
    set backCount(count) {
        if (count > 0) {
            count = 0;
        }
        if (count < 1 - this.chain.length) {
            count = this.chain.length - 1;
        }
        if (count !== this._backCount) {
            this._backCount = count;
            this.observers.map(observe => observe());
        }
    }
    // concrete implementation and state wrapper
    get concrete() {
        const end = this.chain.length - 1;
        const index = end + this.backCount;
        return this.chain[index];
    }
    set concrete(state) {
        if (this.backCount) {
            this.chain = this.chain
                .slice(0, this.backCount);
            this.backCount = 0;
        }
        this.chain.push(state);
        this.observers.map(observe => observe());
    }
}
// factory dependency injection
Context.CreateStateProxy = (factory, ...observers) => {
    return new Context(factory, observers).getStateProxy();
};
