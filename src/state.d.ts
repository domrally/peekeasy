export interface IState<S, T> {
    [Symbol.asyncIterator](): AsyncGenerator<[S, T], void, unknown>;
    onEnter?(): void;
    onExit?(): void;
}
export declare abstract class State<S, T> implements IState<S, T>, AsyncIterable<[S, T]> {
    #private;
    [Symbol.asyncIterator](): AsyncGenerator<[S, T], void, unknown>;
    private promise;
    private get newPromise();
    constructor();
    protected trigger(trigger: T): void;
}
