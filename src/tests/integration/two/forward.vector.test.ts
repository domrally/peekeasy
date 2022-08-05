import { Forward, Vector } from '../../../exports/exports'
import { test } from '../../test.test'

async function integrationForwardVector() {
	const forward = new Vector(new Forward()),
		f = () => {}

	forward.add(f)

	const [is] = forward.has(f)

	return is
}

test(integrationForwardVector)
