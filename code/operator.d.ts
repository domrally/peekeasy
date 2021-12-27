export declare class Operator<T extends {}> extends Set<T> implements ProxyHandler<T> {
    caller: T;
    constructor(caller: T);
    listeners: WeakSet<T>;
    get(target: any, key: string | symbol | number): any;
    set<V>(target: any, key: string | symbol | number, value: V): boolean;
    apply(target: any, that: any, args: any): any;
}
