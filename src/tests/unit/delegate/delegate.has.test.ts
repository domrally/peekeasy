import { Delegate, Forward } from '../../../exports/exports'
import { test } from '../../test.test'

function has() {
	const delegate = new Forward(),
		t = () => {},
		event = new Delegate(delegate)

	event.add(t)

	return event.has(t)
}

test(has)
