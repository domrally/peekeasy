declare type ValuesWithKeys<T, K extends keyof T> = T[K];
export declare type events<T> = ValuesWithKeys<T, keyof T>;
export {};
