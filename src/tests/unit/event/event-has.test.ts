import { Delegate, Event } from '../../../exports/exports'
import { test } from '../../test.test'

function has() {
	const delegate = new Delegate(),
		t = () => {},
		event = new Event(delegate)

	event.add(t)

	return event.has(t)
}

test(has)
