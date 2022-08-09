import { Delegate, Forward, Vector } from '../../../exports/exports'
import { test } from '../../test.test'

async function integrationDelegateForwardVector() {
	const //
		f = () => {},
		forward = new Forward(f),
		delegate = new Delegate(forward),
		vector = new Vector(delegate),
		[has] = vector.has(f)

	return has
}

test(integrationDelegateForwardVector)
