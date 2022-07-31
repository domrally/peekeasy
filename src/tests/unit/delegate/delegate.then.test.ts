import { assert, warn } from 'console'
import { Delegate, Forward } from '../../../exports/exports'

async function test() {
	const event = new Forward<[isTrue: boolean]>(true),
		stream = new Delegate(event)

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
