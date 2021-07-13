declare type ValuesWithKeys<T, K extends keyof T> = T[K];
declare type Machineable = {
    onEnter?(): void;
    onExit?(): void;
};
export declare type createTriggers<T> = ValuesWithKeys<T, keyof T>;
export declare const composeState: <S, T extends symbol>(Base: new (...args: any[]) => S & {
    state: State<T>;
    onEnter?(): void;
    onExit?(): void;
}) => new (...args: any[]) => S & AsyncIterable<T>;
export declare const createProxy: <S, T extends symbol>(initialState: S & Machineable & AsyncIterable<T>, transitions: Record<T, [S & Machineable & AsyncIterable<T>, S & Machineable & AsyncIterable<T>][]>) => S & AsyncIterable<S>;
declare const State_base: any;
export declare class State<T> extends State_base<T> {
}
export {};
