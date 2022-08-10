import { Delegate } from '../../../exports/exports'
import { test } from '../../test.test'

async function delegateDelete() {
	const delegate = new Delegate(),
		f = () => {}

	delegate.delete(f)
	delegate.add(f)
	delegate.delete(f)

	return !delegate.has(f)
}

test(delegateDelete)
