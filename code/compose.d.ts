import { State } from './state.js';
export declare function compose<S, T extends symbol>(Base: Input<S, T>): Output<S, T>;
declare type Input<S, T extends symbol> = new (...args: any[]) => S & {
    state: State<T>;
    onEnter?(): void;
    onExit?(): void;
};
declare type Output<S, T extends symbol> = new (...args: any[]) => S & AsyncIterable<T>;
export {};
