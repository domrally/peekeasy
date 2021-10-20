declare type ValuesWithKeys<T, K extends keyof T> = T[K];
export declare type Events<T> = ValuesWithKeys<T, keyof T>;
export declare type Eventable = {
    readonly [key: string]: symbol;
};
export {};
