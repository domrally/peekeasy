export type Behavior<T extends any[], U extends any = void> = (
	...args: T
) => Promise<U>

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
	task: Behavior<T, any> | Behavior<T, any>[],
	...tasks: Behavior<T, any>[]
) => Behavior<T>
