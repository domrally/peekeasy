type ValuesWithKeys<T, K extends keyof T> = T[K]
export type Events<T> = ValuesWithKeys<T, keyof T>
export type Eventable = { readonly [key: string]: symbol }