export type Behavior<T extends any[]> = (...args: T) => Promise<void>

export const Behavior = function (...tasks: any) {
	const [first] = tasks,
		sequence = first instanceof Array

	return async (...input: []) => {
		for (let child of sequence ? first : tasks) {
			try {
				await child(...input)

				if (!sequence) return Promise.resolve()
			} catch {
				if (sequence) return Promise.reject()
			}
		}

		return sequence ? Promise.resolve() : Promise.reject()
	}
} as unknown as new <T extends any[] = []>(
	task: ((...t: T) => Promise<void>) | ((...t: T) => Promise<void>)[],
	...tasks: ((...t: T) => Promise<void>)[]
) => Behavior<T>
