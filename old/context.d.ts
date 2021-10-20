import { Custom } from './custom.js';
export declare const handleContext: <S extends AsyncIterable<T>, T extends symbol>(currentState: M<S>, transitions: Record<T, WeakMap<S, S>>) => {
    get: (_: S, key: any) => any;
    set: (_: S, key: any, value: any) => any;
};
declare type M<S> = Custom & S;
export {};
