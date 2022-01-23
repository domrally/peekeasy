export declare class Proxier<T extends {
    [key: PropertyKey]: {};
}> implements ProxyHandler<T> {
    constructor(target?: T);
    private target;
    readonly proxy: T;
    setProxy(target: T): T;
    readonly get: (target: T, key: PropertyKey) => any;
    readonly set: <V>(target: any, key: PropertyKey, value: V) => V;
    readonly apply: (target: T, that: T, args: []) => any;
}
