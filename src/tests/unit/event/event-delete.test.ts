import { Delegate, Event } from '../../../exports/exports'
import { test } from '../../test.test'

function deleted() {
	const delegate = new Delegate<[isTrue: boolean]>(),
		t = (message: boolean) => (is = message),
		event = new Event(delegate)

	let is = false

	event.add(t)
	delegate(true)

	event.delete(t)
	delegate(false)

	return is
}

test(deleted)
