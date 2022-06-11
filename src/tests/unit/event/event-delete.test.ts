import { assert } from 'console'
import { Delegate, Event } from '../../../exports/exports'

async function test() {
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

try {
	assert(test(), '❌ callbacks')
} catch (e) {
	assert(false, '❌ callbacks: ', e)
}
