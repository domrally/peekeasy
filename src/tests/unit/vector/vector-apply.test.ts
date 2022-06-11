import { assert } from 'console'
import { IterableIterator, Vector } from '../../../exports/exports'

async function test() {
	const ii = new IterableIterator(true),
		vector = new Vector(ii),
		result = vector()

	return result === ii
}

try {
	assert(test(), '❌ apply')
} catch (e) {
	assert(false, '❌ apply: ', e)
}
