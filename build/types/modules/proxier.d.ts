export declare class Proxier<T extends {}> implements ProxyHandler<T> {
    private target?;
    constructor(target?: T | undefined);
    readonly proxy: T;
    setProxy(target: T): T;
    readonly get: (target: any, key: string) => any;
    readonly set: <V>(target: any, key: string, value: V) => V;
    readonly apply: (target: any, that: T, args: []) => any;
}
