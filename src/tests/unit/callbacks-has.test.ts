import { assert } from 'console'
import { Event } from '../../exports/exports'

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
