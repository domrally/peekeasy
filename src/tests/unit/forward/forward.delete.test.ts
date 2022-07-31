import { Forward } from '../../../exports/exports'
import { test } from '../../test.test'

function deleted() {
	const delegate = new Forward<[isTrue?: boolean]>(),
		t = (message?: boolean) => (is = message as boolean)

	let is = false

	delegate.add(t)
	delegate(true)

	delegate.delete(t)
	delegate(false)

	return is
}

test(deleted)
