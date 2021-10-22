declare type Key = string | number | symbol;
declare type Property = {
    key: Key;
    value: any;
};
declare class Context<T> implements AsyncIterable<Property> {
    #private;
    get target(): T;
    set target(target: T);
    [Symbol.asyncIterator](): AsyncGenerator<Property, void, unknown>;
}
