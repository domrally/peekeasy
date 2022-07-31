import { Vector } from '../../../exports/exports'
import { test } from '../../test.test'

async function vectorSet() {
	const f = [false],
		vector = new Vector(f)

	vector[0] = true as any

	const [is] = vector[0]

	return is
}

test(vectorSet)
