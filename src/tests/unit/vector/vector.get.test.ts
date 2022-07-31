import { Vector } from '../../../exports/exports'
import { test } from '../../test.test'

async function vectorGet() {
	const f = [true],
		vector = new Vector(f),
		[is] = vector[0]

	return is
}

test(vectorGet)
