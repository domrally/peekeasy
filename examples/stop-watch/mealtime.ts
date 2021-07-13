type ValuesWithKeys<T, K extends keyof T> = T[K]
export type createTriggers<T> = ValuesWithKeys<T, keyof T>
export type Machineable = {
	onEnter?(): void
	onExit?(): void
}
export const createState: <S, T extends symbol>(Base: new (...args: any[]) => S & { state: State<T>, onEnter?(): void, onExit?(): void }) => new (...args: any[]) => S & AsyncIterable<T> = (window as any).createState
export const createProxy: <S, T extends symbol>(initialState: S & Machineable & AsyncIterable<T>, transitions: Record<T, [S & Machineable & AsyncIterable<T>, S & Machineable & AsyncIterable<T>][]>) => S & AsyncIterable<S> = (window as any).createProxy
const state = (window as any).State
export type State<T> = typeof state