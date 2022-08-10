import { Vector } from '../../../exports/exports'
import { test } from '../../test.test'

async function vectorGet() {
	const vector = new Vector([{ bool: true }, { bool: false }]),
		bools = vector.bool,
		[is] = bools

	const t = {
			bool: true,
		},
		f = {
			bool: false,
		},
		array = [t, f]

	return is
}

test(vectorGet)
