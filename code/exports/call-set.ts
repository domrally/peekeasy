import type { Call } from './call'

export type CallSet<T extends any[]> = WeakSet<Call<T>>
