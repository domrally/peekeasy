//
export interface Mutator<T> {
    setState: (state: T) => void
    resetState: Function
    start: Function
    back: Function
    forward: Function
    end: Function
}
export type Factory<T extends object> = (context: Mutator<T>) => T
export class Context<T extends object> {
    // factory dependency injection
    static CreateStateProxy = <T extends object>(factory: Factory<T>, ...observers: (() => void)[]) => {
        return new Context(factory, observers).getStateProxy()
    }
    // 
    private chain: T[]
    private _backCount = 0
    private get backCount(): number {
        return this._backCount
    }
    private set backCount(count: number) {
        if (count > 0) {
            count = 0
        }
        if (count < 1 - this.chain.length) {
            count = this.chain.length - 1
        }
        if (count !== this._backCount) {
            this._backCount = count
            this.observers.map(observe => observe())
        }
    }
    private mutator: Mutator<T> = {
        setState: (state: T) => this.concrete = state,
        resetState: () => this.concrete = this.factory(this.mutator),
        start: () => this.backCount = 1 - this.chain.length,
        back: () => this.backCount--,
        forward: () => this.backCount++,
        end: () => this.backCount = 0
    }
    // concrete implementation and state wrapper
    private get concrete(): T & any {
        const end = this.chain.length - 1
        const index = end + this.backCount
        return this.chain[index]
    }
    private set concrete(state: T & any) {
        if (this.backCount) {
            this.chain = this.chain
                .slice(0, this.backCount)
            this.backCount = 0
        }
        this.chain.push(state)
        this.observers.map(observe => observe())
    }
    private handler = {
        get: (_target: T, prop: any) => this.concrete[prop],
        set: (_target: T, prop: any, value: any) => this.concrete[prop] = value
    }
    private proxy: T
    // start with the initial state returned by the factory
    constructor(private factory: Factory<T>, private observers: (() => void)[] = []) {
        this.chain = [factory(this.mutator)]
        this.proxy = new Proxy<T>(this.concrete, this.handler)
    }
    // tools for managing the state from outside the machine
    getStateProxy = (): T => this.proxy
    
}
