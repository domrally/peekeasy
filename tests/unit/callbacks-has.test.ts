import { assert } from 'console'
import { Event } from '../../src/src'

async function test() {
	const event = new Event(),
		t = () => {}

	event.add(t)

	return event.has(t)
}

try {
	assert(test(), '❌ callbacks')
} catch (e) {
	assert(false, '❌ callbacks: ', e)
}
