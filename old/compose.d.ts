import { Eventable, Events } from './events.js';
import { state } from './state.js';
export declare function compose<S, T extends Eventable>(Base: Input<S, T>): Output<S, T>;
declare type Input<S, T extends Eventable> = new (...args: any[]) => S & {
    state: state<T>;
    onEnter?(): void;
    onExit?(): void;
};
declare type Output<S, T extends Eventable> = new (...args: any[]) => S & AsyncIterable<Events<T>>;
export {};
