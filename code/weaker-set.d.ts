export declare class WeakerSet<T extends {}> implements WeakSet<T> {
    #private;
    constructor(weak: WeakSet<T>);
    has(t: T): boolean;
    add(t: T): any;
    delete(t: T): any;
    get [Symbol.toStringTag](): string;
}
