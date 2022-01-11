export declare class PeekSet<T extends {}> implements WeakSet<T> {
    private set;
    constructor(set: WeakSet<T>);
    has(t: T): boolean;
    add(t: T): any;
    delete(t: T): boolean;
    get [Symbol.toStringTag](): string;
}
