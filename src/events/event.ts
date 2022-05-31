export default Event

export interface Event<params extends any[]>
	extends WeakSet<Action>,
		PromiseLike<params>,
		AsyncIterable<params> {
	(...args: params): void
}

export class Event<params extends any[]> {
	constructor(...initial: params) {
		const set = new Set<Action>(),
			event: Partial<Event<params>> = (...args: params) => {
				const copy = new Set(set)
				copy.forEach(resolve => resolve?.(...args))
			}

		event.has = (a: Action) => set.has(a)

		event.delete = (a: Action) => set.delete(a)

		event.add = (a: Action) => {
			a(...initial)
			set.add(a)
			return this
		}

		event.then = async <U = params, V = never>(
			onfulfilled: (args: params) => PromiseLike<U>,
			onrejected: (reason: any) => PromiseLike<V>
		) => {
			try {
				const thing = (await event[Symbol.asyncIterator]!().next())
					.value as params
				return onfulfilled?.(thing)
			} catch (error) {
				return onrejected?.(error)
			}
		}

		event[Symbol.asyncIterator] = async function* () {
			while (true) {
				yield new Promise<params>(resolve => {
					const resolution = ((...args: params) => resolve(args)) as Action
					set.add(resolution)
				})
			}
		}

		return event as unknown as this
	}
}

type Action = (...args: any[]) => void
