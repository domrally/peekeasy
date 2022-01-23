export declare class Caller<T extends (...args: any[]) => void> extends Set<(parameters: Parameters<T>) => void> {
    #private;
    readonly callBacks: WeakSet<T>;
    readonly call: (...parameters: Parameters<T>) => void;
    get callBacksAsync(): Iterable<PromiseLike<Parameters<T>>>;
}
