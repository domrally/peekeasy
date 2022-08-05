import { Delegate, Reference } from '../../../exports/exports'
import { test } from '../../test.test'

async function integrationDelegateReference() {
	const delegate = new Reference(new Delegate()),
		f = () => {}

	delegate.add(f)

	return delegate.has(f)
}

test(integrationDelegateReference)
