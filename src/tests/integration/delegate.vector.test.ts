import { Delegate, Vector } from '../../exports/exports'
import { test } from '../test.test'

async function integrationDelegateVector() {
	const delegate = new Vector(new Delegate()),
		f = () => {}

	delegate.add(f)

	return delegate.has(f)
}

test(integrationDelegateVector)
