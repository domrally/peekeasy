/**
 * A side effect only function
 * @param args data that is pass to the action that is performed
 */
export type Action<params extends any[]> = (...args: params) => void
