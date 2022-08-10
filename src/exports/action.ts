/**
 * ### description
 *
 * A side effect only function
 *
 */
export type Action<params extends any[] = []> = (...args: params) => void
