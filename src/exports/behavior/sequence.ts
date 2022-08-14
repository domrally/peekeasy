import { Task } from './task'

export type Sequence<I extends any[], O> = Task<I, O>

export const Sequence = function <I extends any[], O>(...tasks: Task<I, O>[]) {
	return async (...i: I) => {
		for (const child of tasks) {
			return child(...i)
		}

		return Promise.resolve(null)
	}
} as unknown as new <I extends any[], O>(...children: Task<I, O>[]) => Sequence<
	I,
	O
>
