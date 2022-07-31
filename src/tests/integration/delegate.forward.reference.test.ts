import { Delegate, Forward, Reference } from '../../exports/exports'
import { test } from '../test.test'

async function integrationDelegateForwardReference() {
	const forward = new Forward(),
		delegate = new Reference(new Delegate(forward)),
		f = () => {}

	delegate.add(f)

	return delegate.has(f)
}

test(integrationDelegateForwardReference)
