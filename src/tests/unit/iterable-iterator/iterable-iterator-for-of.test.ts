import { assert } from 'console'
import { IterableIterator } from '../../../exports/exports'

async function test() {
	let i = 0

	for (const index of new IterableIterator(1, 2, 3)) {
		assert(++i == index, '❌ for of index is not correct')
	}

	return true
}

try {
	assert(test(), '❌ for of')
} catch (e) {
	assert(false, '❌ for of: ', e)
}
