import { assert, warn } from 'console'
import { Vector } from '../../../exports/exports'
import { test } from '../../test.test'

function keys() {
	const vector = new Vector({ index: 1 }, { index: 2 }, { index: 3 }),
		result = vector.index

	let index = 0,
		is = true

	for (const i of result) {
		const a = ++index === i
		is = is && a
		assert(a, `❌ indices ${i} & ${index} are not equal`)
	}

	return is
}

test(keys)
