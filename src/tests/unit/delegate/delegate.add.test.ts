import { Delegate } from '../../../exports/exports'
import { test } from '../../test.test'

async function delegateAdd() {
	const delegate = new Delegate(new Set()),
		f = () => {}

	delegate.add(f)

	return delegate.has(f)
}

test(delegateAdd)
