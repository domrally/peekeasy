import { assert } from 'console'
import { IterableIterator, Vector } from '../../../exports/exports'
import { test } from '../../test.test'

function key() {
	const ii = new IterableIterator({ is: true }),
		vector = new Vector(ii),
		result = vector.is()

	let r = false
	for (const is of result) {
		r = is
	}

	return true
}

test(key)
