import { Task } from './task'

export type Fallback<I extends any[], O> = Task<I, O>

export const Fallback = function <I extends any[], O>(...tasks: Task<I, O>[]) {
	return async (...i: I) => {
		for (const child of tasks) {
			try {
				return child(...i)
			} catch {}
		}

		return Promise.reject()
	}
} as unknown as new <I extends any[], O>(...children: Task<I, O>[]) => Fallback<
	I,
	O
>
