import { Event } from './exports'

export const IterableIterator = function <T extends Event<[]>>(...values: T[]) {
	const states = values as unknown as IterableIterator<T>

	states.next = () => ({ value: values[0] })

	for (const event of states) {
		event.add?.(() => (states.next = () => ({ value: event })))
	}

	return states
} as unknown as new <T extends Event<[]>>(...values: T[]) => IterableIterator<T>
