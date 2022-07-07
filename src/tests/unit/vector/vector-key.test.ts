import { assert } from 'console'
import { Vector } from '../../../exports/exports'
import { test } from '../../test.test'

function key() {
	const ii = { is: true },
		vector = new Vector(ii),
		result = vector.is

	let r = false
	for (const is of result) {
		r = is
	}

	return r
}

test(key)
