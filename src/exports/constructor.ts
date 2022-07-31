export type Constructor<T, params extends any[] = []> = new (
	...initial: params
) => T
export const Constructor = function (f: unknown) {
	return f
} as unknown as new <T, params extends any[] = []>(
	f: (...initial: params) => T
) => Constructor<T, params>
