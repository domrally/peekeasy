import { assert, warn } from 'console'
import { Delegate, Event } from '../../../exports/exports'

async function test() {
	const event = new Delegate<[isTrue: boolean]>([true]),
		stream = new Event(event)

	const [is] = await stream

	return is
}

try {
	;(async () => {
		warn((await test()) ? '\t✅ async await' : '\t❌ async await')
	})()
} catch (e) {
	assert(false, '❌ async await: ', e)
}
