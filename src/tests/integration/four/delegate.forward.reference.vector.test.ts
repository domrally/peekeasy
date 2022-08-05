import { Delegate, Forward, Reference, Vector } from '../../../exports/exports'
import { test } from '../../test.test'

async function integrationDelegateForwardReferenceVector() {
	const forward = new Forward(),
		delegate = new Delegate(forward),
		reference = new Reference(delegate),
		vector = new Vector(delegate),
		f = (si: boolean) => true

	forward()

	return false
}

test(integrationDelegateForwardReferenceVector)
