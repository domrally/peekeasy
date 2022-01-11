export declare class Sender<T extends () => void> extends Set<T> implements ProxyHandler<T> {
    readonly send: T;
    readonly sent: WeakSet<T>;
    set<V>(_: T, key: Key, value: V): boolean;
    apply(_: T, that: T, args: any): void;
}
declare type Key = string | number | symbol;
export {};
