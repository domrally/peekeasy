import { Delegate, Forward } from '../../../exports/exports'
import { test } from '../../test.test'

async function delegateThen() {
	const forward = new Forward(true),
		delegate = new Delegate(forward)

	const [is] = await delegate

	return is
}

test(delegateThen)
