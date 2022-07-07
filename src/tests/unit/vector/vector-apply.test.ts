import { Vector } from '../../../exports/exports'
import { test } from '../../test.test'

function apply() {
	const vector = new Vector({ v: true })

	let is = false

	for (const iterator of vector.v) {
		is = iterator
	}

	return is
}

test(apply)
