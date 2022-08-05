import { Delegate, Vector } from '../../../exports/exports'
import { test } from '../../test.test'

async function integrationDelegateVector() {
	const delegate = new Vector(new Delegate()),
		f = () => {}

	delegate.add(f)

	const [is] = delegate.has(f)

	return is
}

test(integrationDelegateVector)
