declare type Key = string | number | symbol;
declare type Property = [key: Key, value: any];
export declare class Context<T> {
    #private;
    get target(): T;
    set target(target: T);
    observe(): AsyncGenerator<Property, void, unknown>;
    get(_: T, key: Key): any;
    set<V>(_: T, key: Key, value: V): boolean;
}
export {};
