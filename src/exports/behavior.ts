export type Behavior<I = never, O = void> = (input?: I) => Promise<O>

export const Behavior = function (sequence: boolean, ...tasks: any) {
	return async (i: string) => {
		for (let child of tasks) {
			try {
				const resolved = await child(i)

				if (!sequence) return resolved
			} catch {
				if (sequence) return Promise.reject()
			}
		}

		return sequence ? Promise.resolve() : Promise.reject()
	}
} as unknown as new <T extends ((a: any) => any)[] = (() => void)[]>(
	sequence: boolean,
	...tasks: T
) => Behavior<Parameters<T[number]>[0], ReturnType<T[number]>>
