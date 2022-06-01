import { assert } from 'console'
import { Event } from '../../src/src'

async function test() {
	new Event()()
	return true
}

try {
	assert(test(), '❌ callbacks')
} catch (e) {
	assert(false, '❌ callbacks: ', e)
}
