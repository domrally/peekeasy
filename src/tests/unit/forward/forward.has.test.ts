import { Forward } from '../../../exports/exports'
import { test } from '../../test.test'

function has() {
	const delegate = new Forward(),
		t = () => {}

	delegate.add(t)

	return delegate.has(t)
}

test(has)
