declare type ValuesWithKeys<T, K extends keyof T> = T[K];
export declare type createTriggers<T> = ValuesWithKeys<T, keyof T>;
export {};
