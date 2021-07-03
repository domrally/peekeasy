import { State } from './state.js';
import { TransitionMap } from './transitions.js';
export declare class Context<S extends object & State<S, T>, T extends number> implements AsyncIterable<S> {
    private currentState;
    private transitions;
    [Symbol.asyncIterator](): AsyncGenerator<S, void, unknown>;
    private getNext;
    get target(): S & AsyncIterable<S>;
    get handler(): {
        get: (_: S, property: any) => any;
        set: (_: S, property: any, value: any) => any;
    };
    constructor(currentState: S, transitions: TransitionMap<S, T>);
    init(): Promise<void>;
}
