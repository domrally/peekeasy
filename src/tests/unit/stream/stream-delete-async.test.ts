import { assert, warn } from 'console'
import { Delegate, Event } from '../../../exports/exports'

async function test() {
	const event = new Delegate<[isTrue: boolean]>([true]),
		stream = new Event(event)

	let is = false
	for await (const [message] of stream) {
		is = message
		break
	}

	return is
}

try {
	;(async () => {
		warn((await test()) ? '\tâ async iterable' : '\tâ async iterable')
	})()
} catch (e) {
	assert(false, 'â async iterable: ', e)
}
