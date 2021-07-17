import { Machineable } from './state.js';
declare type M<S> = Machineable & S;
export declare const createHandler: <S extends AsyncIterable<T>, T extends symbol>(currentState: M<S>, transitions: Record<T, WeakMap<S, S>>) => {
    get: (_: S, key: any) => any;
    set: (_: S, key: any, value: any) => any;
};
export {};
