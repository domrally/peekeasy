declare type ValuesWithKeys<T, K extends keyof T> = T[K];
export declare type Events<T> = ValuesWithKeys<T, keyof T>;
export declare const Events: <T>(triggers: T) => Readonly<T>;
export {};
