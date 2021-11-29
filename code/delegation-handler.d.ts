export declare class DelegationHandler<S extends {}> implements ProxyHandler<S> {
    delegate: any;
    get(_: S, key: string | symbol | number): any;
    set<V>(_: S, key: string | symbol | number, value: V): boolean;
    apply(_: S, that: any, args: any): any;
    constructor(delegate: any);
}
