import { Event } from './exports'

export const IterableIterator = function (...values: any) {
	values.next = () => ({ value: values[0] })

	for (const value of values) {
		value.add?.(() => (values.next = () => ({ value })))
	}

	return values
} as unknown as new <T extends Event<[]>>(...values: T[]) => IterableIterator<T>
