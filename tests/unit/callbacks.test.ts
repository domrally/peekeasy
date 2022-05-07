import { assert } from 'console'
import { Caller } from '../../code/modules'

async function test() {
	const { call, callbacks } = new Caller<[isTrue: boolean]>()
	let is = false
	callbacks.add(message => {
		is = message
	})
	call(true)

	return is
}

try {
	assert(test(), '❌ callbacks')
} catch (e) {
	assert(false, '❌ callbacks: ', e)
}
