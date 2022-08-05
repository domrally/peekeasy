import { Forward, Reference, Vector } from '../../../exports/exports'
import { test } from '../../test.test'

async function integrationForwardReferenceVector() {
	const forward = new Forward(),
		reference = new Reference(),
		vector = new Vector(forward)

	const [bool] = new Vector(new Reference(true as any))

	return bool
}

test(integrationForwardReferenceVector)
