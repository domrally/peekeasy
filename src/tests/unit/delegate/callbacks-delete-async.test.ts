import { assert } from 'console'
import { Delegate } from '../../../exports/exports'
import { Stream } from '../../../exports/stream'

async function test() {
	const event = new Delegate<[isTrue: boolean]>([false]),
		stream = new Stream(event)
	let is = false
	for await (const [message] of stream) {
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
