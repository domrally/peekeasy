import { Delegate, Forward } from '../../../exports/exports'
import { test } from '../../test.test'

function deleted() {
	const delegate = new Forward<[isTrue?: boolean]>(),
		t = (message?: boolean) => (is = message as boolean),
		event = new Delegate(delegate)

	let is = false

	event.add(t)
	delegate(true)

	event.delete(t)
	delegate(false)

	return is
}

test(deleted)
