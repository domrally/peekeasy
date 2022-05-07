import { assert } from 'console'
import { Caller } from '../../code/modules'

async function test() {
	const { call, callbacks } = new Caller<[isTrue: boolean]>()
	let is = false
	for await (const [message] of callbacks) {
		is = message
		break
	}
	call(true)
	call(false)

	return is
}

try {
	assert(test(), '❌ callbacks-async')
} catch (e) {
	assert(false, '❌ callbacks-async: ', e)
}
