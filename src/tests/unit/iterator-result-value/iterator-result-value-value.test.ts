import { assert } from 'console'
import { IterableIterator, IteratorResultValue } from '../../../exports/exports'

async function test() {
	const ii = new IterableIterator(true),
		value = new IteratorResultValue(ii)

	return value && value === ii
}

try {
	assert(test(), '❌ value')
} catch (e) {
	assert(false, '❌ value: ', e)
}
