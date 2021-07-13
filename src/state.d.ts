export interface Machineable {
    onEnter?(): void;
    onExit?(): void;
}
declare type Input<S, T extends symbol> = new (...args: any[]) => S & {
    state: State<T>;
    onEnter?(): void;
    onExit?(): void;
};
declare type Output<S, T extends symbol> = new (...args: any[]) => S & AsyncIterable<T>;
export declare function composeState<S, T extends symbol>(Base: Input<S, T>): Output<S, T>;
export declare class State<T extends symbol> implements AsyncIterable<T> {
    #private;
    get trigger(): (_trigger: T) => void;
    [Symbol.asyncIterator](): AsyncGenerator<T, void, unknown>;
}
export {};
