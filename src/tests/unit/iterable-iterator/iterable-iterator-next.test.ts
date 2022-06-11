import { assert } from 'console'
import { IterableIterator } from '../../../exports/exports'

async function test() {
	const { next } = new IterableIterator(true),
		result = next(),
		{ value } = result

	return value
}

try {
	assert(test(), '❌ next')
} catch (e) {
	assert(false, '❌ next: ', e)
}
