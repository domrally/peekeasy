import { assert } from 'console'
import { Event } from '../../exports/exports'

async function test() {
	const event = new Event<[isTrue: boolean]>([false])
	let is = false
	for await (const [message] of event) {
		is = message
		break
	}
	event(true)
	event(false)

	return is
}

try {
	assert(test(), '❌ callbacks-async')
} catch (e) {
	assert(false, '❌ callbacks-async: ', e)
}