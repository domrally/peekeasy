import { Forward, Reference } from '../../../exports/exports'
import { test } from '../../test.test'

async function integrationForwardReference() {
	const forward = new Reference(new Forward()),
		f = () => {}

	forward.add(f)

	return forward.has(f)
}

test(integrationForwardReference)
