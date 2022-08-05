import { Delegate, Forward, Vector } from '../../../exports/exports'
import { test } from '../../test.test'

async function integrationDelegateForwardVector() {
	const forward = new Forward(),
		delegate = new Delegate(forward),
		vector = new Vector(delegate)

	return false
}

test(integrationDelegateForwardVector)
