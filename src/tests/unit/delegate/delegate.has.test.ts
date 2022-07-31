import { Delegate } from '../../../exports/exports'
import { test } from '../../test.test'

async function delegateHas() {
	const delegate = new Delegate(),
		f = () => {}

	delegate.add(f)

	return delegate.has(f)
}

test(delegateHas)
