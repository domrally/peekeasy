type ValuesWithKeys<T, K extends keyof T> = T[K]
export type events<T> = ValuesWithKeys<T, keyof T>
