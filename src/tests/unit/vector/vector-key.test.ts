import { assert } from 'console'
import { IterableIterator, Vector } from '../../../exports/exports'

async function test() {
	const ii = new IterableIterator({ is: true }),
		vector = new Vector(ii),
		result = vector.is()

	for (const is of result) {
		assert(is, '❌ key')
	}

	return true
}

try {
	test()
} catch (e) {
	assert(false, '❌ key: ', e)
}
