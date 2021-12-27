export declare class EventDelegate<T extends {}> extends Set<T> implements ProxyHandler<T> {
    delegate: T;
    constructor(delegate: T);
    event: WeakSet<T>;
    get(target: any, key: string | symbol | number): any;
    set<V>(target: any, key: string | symbol | number, value: V): boolean;
    apply(target: any, that: any, args: any): any;
}
