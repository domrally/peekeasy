import type { VoidFunction } from './void-function'

export type ProxySet<T extends any[]> = WeakSet<VoidFunction<T>> & Iterable<PromiseLike<T>>
