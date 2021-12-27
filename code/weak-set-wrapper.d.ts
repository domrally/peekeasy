export declare class WeakSetWrapper<T extends {}> implements WeakSet<T> {
    #private;
    constructor(set: WeakSet<T>);
    has(t: T): boolean;
    add(t: T): any;
    delete(t: T): any;
    get [Symbol.toStringTag](): string;
}
