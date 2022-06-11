import { assert } from 'console'
import { Delegate, Event } from '../../../exports/exports'

async function test() {
	const delegate = new Delegate(),
		t = () => {},
		event = new Event(delegate)

	event.add(t)

	return event.has(t)
}

try {
	assert(test(), '❌ callbacks')
} catch (e) {
	assert(false, '❌ callbacks: ', e)
}
