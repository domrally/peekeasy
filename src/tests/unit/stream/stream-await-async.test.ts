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
		warn((await test()) ? '\tâ async await' : '\tâ async await')
	})()
} catch (e) {
	assert(false, 'â async await: ', e)
}
