export declare class Holder<T extends {}> implements ProxyHandler<T> {
    #private;
    readonly held: T;
    readonly hold: (target: T) => T;
    readonly get: (_: T, key: Key) => any;
    readonly set: <V>(_: T, key: Key, value: V) => V;
    readonly apply: (_: T, that: T, args: any) => any;
}
declare type Key = string | number | symbol;
export {};
