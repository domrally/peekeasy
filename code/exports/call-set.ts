import type { Callable } from './callable'

export type CallSet<T extends any[]> = WeakSet<Callable<T>>
