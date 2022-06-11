/**
 * ### description
 *
 * A side effect only function
 *
 * _example_
 * ```ts
 * export type Event<params extends any[]> = WeakSet<Action<params>>
 * ```
 * @param args data that is pass to the action that is performed
 */
export type Action<params extends any[]> = (...args: params) => void
