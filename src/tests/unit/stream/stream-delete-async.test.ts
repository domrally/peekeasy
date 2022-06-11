import { assert, warn } from 'console'
import { Delegate } from '../../../exports/exports'
import { Stream } from '../../../exports/stream'

async function test() {
	const event = new Delegate<[isTrue: boolean]>([true]),
		stream = new Stream(event)

	let is = false
	for await (const [message] of stream) {
		is = message
		break
	}

	return is
}

try {
	;(async () => {
		warn((await test()) ? '\t✅ async iterable' : '\t❌ async iterable')
	})()
} catch (e) {
	assert(false, '❌ async iterable: ', e)
}
