export declare abstract class State<S, T> implements AsyncIterable<[S, T]> {
    #private;
    abstract onEnter(): void;
    abstract onExit(): void;
    [Symbol.asyncIterator](): AsyncGenerator<[S, T], void, unknown>;
    private promise;
    private get newPromise();
    constructor();
    protected trigger(trigger: T): void;
}
