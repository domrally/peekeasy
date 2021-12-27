export declare class SetAndProxyHandler<T extends {}> extends Set<T> implements ProxyHandler<T> {
    get(target: any, key: string | symbol | number): any;
    set<V>(target: any, key: string | symbol | number, value: V): boolean;
    apply(target: any, that: any, args: any): any;
}
