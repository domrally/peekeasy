import { assert } from 'console'
import { Caller } from '../../code/modules'

async function test() {
	const { call, callbacks } = new Caller<[isTrue: boolean]>(),
		t = message => (is = message)
	let is = false
	callbacks.add(t)
	call(true)
	callbacks.delete(t)
	call(false)

	return is
}

try {
	assert(test(), '❌ callbacks')
} catch (e) {
	assert(false, '❌ callbacks: ', e)
}
