import { assert } from 'console'
import { Event } from '../../exports/exports'

async function test() {
	new Event()()
	return true
}

try {
	assert(test(), '❌ callbacks')
} catch (e) {
	assert(false, '❌ callbacks: ', e)
}
