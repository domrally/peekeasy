import { Delegate } from '../../../exports/exports'
import { test } from '../../test.test'

async function delegateHas() {
	const delegate = new Delegate()

	return !delegate.has(() => {})
}

test(delegateHas)
