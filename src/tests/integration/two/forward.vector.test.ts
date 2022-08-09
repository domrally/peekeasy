import { Forward, Vector } from '../../../exports/exports'
import { test } from '../../test.test'

async function integrationForwardVector() {
	let //
		is = false,
		f = () => {
			is = true
		},
		forward = new Forward(f),
		vector = new Vector(forward)

	vector()

	return is
}

test(integrationForwardVector)
