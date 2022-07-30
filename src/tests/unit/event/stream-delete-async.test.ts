import { assert, warn } from 'console'
import { Delegate, Forward } from '../../../exports/exports'

async function test() {
	const event = new Forward<[isTrue: boolean]>(true),
		stream = new Delegate(event)

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
