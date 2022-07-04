import { Vector } from '../../../exports/exports'
import { test } from '../../test.test'

function apply() {
	const ii = { v: true },
		vector = new Vector([ii])

	let is = false

	for (const iterator of vector.v) {
		is = iterator
	}

	return is
}

test(apply)
