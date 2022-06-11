import { assert, warn } from 'console'
import { IterableIterator, Vector } from '../../../exports/exports'

function test() {
	const ii = new IterableIterator({ index: 1 }, { index: 2 }, { index: 3 }),
		vector = new Vector(ii),
		result = vector.index()

	let index = 0,
		is = true

	for (const i of result) {
		const a = ++index === i
		is = is && a
		assert(a, `❌ indices ${i} & ${index} are not equal`)
	}

	return is
}

try {
	if (test()) warn('\t✅ keys')
} catch (e) {
	assert(false, '❌ keys: ', e)
}
