import { assert } from 'console'
import { Event } from '../../exports/exports'

async function test() {
	const event = new Event<[isTrue: boolean]>([false]),
		t = (message: boolean) => (is = message)
	let is = false
	event.add(t)
	event(true)
	event.delete(t)
	event(false)

	return is
}

try {
	assert(test(), '❌ callbacks')
} catch (e) {
	assert(false, '❌ callbacks: ', e)
}
