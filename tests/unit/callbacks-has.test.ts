import { assert } from 'console'
import { Caller } from '../../code/modules'

async function test() {
	const { callbacks } = new Caller(),
		t = () => {}

	callbacks.add(t)

	return callbacks.has(t)
}

try {
	assert(test(), '❌ callbacks')
} catch (e) {
	assert(false, '❌ callbacks: ', e)
}
