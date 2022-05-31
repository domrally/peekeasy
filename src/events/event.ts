export default Event

export interface Event<params extends any[]>
	extends WeakSet<Action>,
		AsyncIterable<params>,
		PromiseLike<params> {
	(...args: params): void
}

export class Event<params extends any[]> {
	constructor(...initial: params) {
		const set = new Set<Action>(),
			event: PromiseLike<params> &
				Partial<WeakSet<Action>> &
				((...args: params) => void) = (...args: params) => {
				const copy = new Set(set)
				copy.forEach(resolve => resolve?.(...args))
			}

		event.has = (a: Action) => set.has(a)

		event.delete = (a: Action) => set.delete(a)

		event.add = (a: Action) => {
			a(...initial)
			return set.add(a)
		}

		event.then = async <U = params, V = never>(
			onfulfilled?: (args: params) => PromiseLike<U>,
			onrejected?: (reason: any) => PromiseLike<V>
		) => {
			try {
				const thing = (await event[Symbol.iterator]().next().value) as params
				return onfulfilled?.(thing)
			} catch (error) {
				return onrejected?.(error)
			}
		}

		event[Symbol.iterator] = async function* () {
			while (true) {
				yield new Promise<params>(resolve =>
					set.add((...args: params) => resolve(args))
				)
			}
		}

		return event as unknown as this
	}
}

type Action = (...args: any[]) => void
