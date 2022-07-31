import { Vector } from '../../../exports/exports'
import { test } from '../../test.test'

async function vectorApply() {
	const f = () => true,
		vector = new Vector(f),
		[is] = vector()

	return is
}

test(vectorApply)
