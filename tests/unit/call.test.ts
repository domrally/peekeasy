import { assert } from 'console'
import { Caller } from '../../code/exports'

async function test() {
	new Caller().call()
	return true
}

try {
	assert(test(), '❌ callbacks')
} catch (e) {
	assert(false, '❌ callbacks: ', e)
}
