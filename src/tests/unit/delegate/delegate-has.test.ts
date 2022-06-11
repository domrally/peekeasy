import { Delegate } from '../../../exports/exports'
import { test } from '../../test.test'

function has() {
	const delegate = new Delegate(),
		t = () => {}

	delegate.add(t)

	return delegate.has(t)
}

test(has)
