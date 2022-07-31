import { Delegate, Forward } from '../../../exports/exports'
import { test } from '../../test.test'

async function delegateAdd() {
	let is = false

	const forward = new Forward(true),
		delegate = new Delegate(forward)

	delegate.add(it => (is = it))

	return is
}

test(delegateAdd)
