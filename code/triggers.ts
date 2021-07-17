type ValuesWithKeys<T, K extends keyof T> = T[K]
export type createTriggers<T> = ValuesWithKeys<T, keyof T>
