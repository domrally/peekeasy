import { Vector } from '../../../exports/exports'
import { test } from '../../test.test'

function apply() {
	class C {
		v() {
			return true
		}
	}
	const vector = new Vector(new C())

	let is = false

	for (const iterator of vector.v()) {
		is = iterator
	}

	return is
}

test(apply)
