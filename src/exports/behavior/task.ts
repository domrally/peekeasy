export type Task<I extends any[] = any[], O = unknown> = (...input: I) => Promise<O>
