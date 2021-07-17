type ValuesWithKeys<T, K extends keyof T> = T[K]
export type Events<T> = ValuesWithKeys<T, keyof T>
export const Events = <T>(triggers: T) => Object.freeze({ ...triggers })