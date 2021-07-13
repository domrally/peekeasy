declare type ValuesWithKeys<T, K extends keyof T> = T[K];
export declare type createTriggers<T> = ValuesWithKeys<T, keyof T>;
export declare type Machineable = {
    onEnter?(): void;
    onExit?(): void;
};
export declare const createState: <S, T extends symbol>(Base: new (...args: any[]) => S & {
    state: State<T>;
    onEnter?(): void;
    onExit?(): void;
}) => new (...args: any[]) => S & AsyncIterable<T>;
export declare const createProxy: <S, T extends symbol>(initialState: S & Machineable & AsyncIterable<T>, transitions: Record<T, [S & Machineable & AsyncIterable<T>, S & Machineable & AsyncIterable<T>][]>) => S & AsyncIterable<S>;
declare const state: any;
export declare type State<T> = typeof state;
export {};
