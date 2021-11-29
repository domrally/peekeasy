export declare class WeakenedSet implements WeakSet<() => void> {
    #private;
    has(t: () => void): boolean;
    add(t: () => void): any;
    delete(t: () => void): any;
    get [Symbol.toStringTag](): string;
    constructor(delegates: WeakSet<() => void>);
}
